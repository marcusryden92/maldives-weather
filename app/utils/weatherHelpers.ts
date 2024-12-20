import { LocationType, WeatherDataArray } from "@/lib/weatherData";

import { fetchWeatherApi } from "openmeteo";

import { VariablesWithTime } from "@/lib/weatherData";

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
  daily: string[];
  timezone: string;
  forecast_days: number;
};

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

// Helper: Helper Function to Get Variables
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
  return variable.value ? variable.value() : 0; // Default to 0 if undefined
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
  return variable.valuesArray ? variable.valuesArray() : []; // Default to empty array
};

// Helper: Process Weather Data
export const processWeatherData = (
  current: VariablesWithTime,
  daily: VariablesWithTime,
  utcOffsetSeconds: number
) => {
  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

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
    temperature: Number(getCurrentVariable(current, 0).toFixed(0)), // Convert temperature to a number and round it
    humidity: getCurrentVariable(current, 1), // Relative humidity
    windSpeed: Number(getCurrentVariable(current, 4).toFixed(0)), // Wind speed, rounded to an integer
  };

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
    forecast: weatherArray,
  };
};
