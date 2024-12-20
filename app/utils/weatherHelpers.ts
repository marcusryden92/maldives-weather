import {
  LocationType,
  WeatherDataArray,
  HourlyWeatherData,
} from "@/lib/weatherData";
import { fetchWeatherApi } from "openmeteo";
import { VariablesWithTime } from "@/lib/weatherData";

import weatherIcons from "@/lib/weather-icons";

// Custom Error Class
export class WeatherAPIError extends Error {
  constructor(message: string, public readonly code?: string) {
    super(message);
    this.name = "WeatherAPIError";
  }
}

type Params = {
  latitude: number;
  longitude: number;
  current: string[];
  hourly: string[];
  daily: string[];
  timezone: string;
  forecast_days: number;
};

// Get weather code icon and description
export function getWeatherCode(weatherCode: number) {
  return weatherIcons.find((c) => {
    if (c.code === weatherCode) {
      return c;
    }
  });
}

// Helper: Get Coordinates from Location
export const getCoordinatesForLocation = (location: LocationType) => {
  const coordinatesMap: {
    [key in LocationType]: { latitude: number; longitude: number };
  } = {
    male: { latitude: 4.1752, longitude: 73.5092 },
    addu: { latitude: -0.6413, longitude: 73.158 },
    maafushi: { latitude: 3.9423, longitude: 73.4907 },
    fuvahmulah: { latitude: -0.2988, longitude: 73.424 },
  };

  return coordinatesMap[location] || { latitude: 0, longitude: 0 };
};

// Helper: API call
export const fetchWeatherData = async (url: string, params: Params) => {
  try {
    return await fetchWeatherApi(url, params);
  } catch (error) {
    throw new WeatherAPIError(
      `Failed to fetch weather data: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      "API_FETCH_ERROR"
    );
  }
};

// Helper: Get Variables Functions
export const getCurrentVariable = (
  current: VariablesWithTime,
  index: number
): number => {
  const variable = current.variables(index);
  if (!variable) {
    throw new WeatherAPIError(
      `Missing current weather variable at index ${index}`,
      "MISSING_VARIABLE"
    );
  }
  return variable.value ? variable.value() : 0;
};

export const getHourlyVariable = (
  hourly: VariablesWithTime,
  index: number
): number[] => {
  const variable = hourly.variables(index);
  if (!variable) {
    throw new WeatherAPIError(
      `Missing hourly weather variable at index ${index}`,
      "MISSING_VARIABLE"
    );
  }
  return variable.valuesArray ? variable.valuesArray() : [];
};

export const getDailyVariable = (
  daily: VariablesWithTime,
  index: number
): number[] => {
  const variable = daily.variables(index);
  if (!variable) {
    throw new WeatherAPIError(
      `Missing daily weather variable at index ${index}`,
      "MISSING_VARIABLE"
    );
  }
  return variable.valuesArray ? variable.valuesArray() : [];
};

// Helper: Process Weather Data
export const processWeatherData = (
  current: VariablesWithTime,
  hourly: VariablesWithTime,
  daily: VariablesWithTime,
  utcOffsetSeconds: number
) => {
  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  // Process current weather
  const currentData = {
    time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
    temperature2m: getCurrentVariable(current, 0),
    relativeHumidity2m: getCurrentVariable(current, 1),
    isDay: getCurrentVariable(current, 2),
    weatherCode: getCurrentVariable(current, 3),
    windSpeed10m: getCurrentVariable(current, 4),
    weekday: new Date(
      (Number(current.time()) + utcOffsetSeconds) * 1000
    ).toLocaleDateString("en-US", { weekday: "long" }),
    temperature: Number(getCurrentVariable(current, 0).toFixed(0)),
    humidity: getCurrentVariable(current, 1),
    windSpeed: Number(getCurrentVariable(current, 4).toFixed(0)),
  };

  // Process hourly forecast
  const hourlyTime =
    hourly.time !== null && hourly.timeEnd && hourly.interval
      ? range(
          Number(hourly.time()),
          Number(hourly.timeEnd()),
          hourly.interval()
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000))
      : [];

  // Group hourly data by day
  const hourlyData: HourlyWeatherData[][] = [];
  let currentDayData: HourlyWeatherData[] = [];
  let currentDay = -1;

  hourlyTime.forEach((time, i) => {
    const dayOfMonth = time.getDate();

    if (currentDay !== dayOfMonth) {
      if (currentDayData.length > 0) {
        hourlyData.push(currentDayData);
        currentDayData = [];
      }
      currentDay = dayOfMonth;
    }

    currentDayData.push({
      time: time.toISOString(),
      temperature: Number(getHourlyVariable(hourly, 0)[i].toFixed(1)),
      weatherCode: getHourlyVariable(hourly, 1)[i],
    });
  });

  // Push the last day's data
  if (currentDayData.length > 0) {
    hourlyData.push(currentDayData);
  }

  // Process daily forecast
  const dailyTime =
    daily.time !== null && daily.timeEnd && daily.interval
      ? range(
          Number(daily.time()),
          Number(daily.timeEnd()),
          daily.interval()
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000))
      : [];

  const dailyData = {
    time: dailyTime,
    weatherCode: getDailyVariable(daily, 0),
    temperature2mMax: getDailyVariable(daily, 1),
    temperature2mMin: getDailyVariable(daily, 2),
    uvIndexMax: getDailyVariable(daily, 3),
    windSpeed10mMax: getDailyVariable(daily, 4),
  };

  const weatherArray: WeatherDataArray = dailyData.time.map((time, i) => ({
    time: time.toISOString(),
    weekday: time.toLocaleDateString("en-US", { weekday: "long" }),
    weatherCode: dailyData.weatherCode[i],
    temperatureMax: Number(dailyData.temperature2mMax[i].toFixed(0)),
    temperatureMin: dailyData.temperature2mMin[i],
    uvIndex: Number(dailyData.uvIndexMax[i].toFixed(1)),
    windSpeedMax: dailyData.windSpeed10mMax[i],
  }));

  return {
    currentWeather: currentData,
    hourlyForecast: hourlyData,
    forecast: weatherArray,
  };
};
