import {
  VariablesWithTime,
  WeatherDataObject,
  HourlyWeatherData,
} from "@/lib/weatherData";

import { WeatherAPIError } from "@/lib/errors";

// Types
export interface CurrentWeather {
  time: Date;
  temperature2m: number;
  relativeHumidity2m: number;
  isDay: number;
  weatherCode: number;
  windSpeed10m: number;
  weekday: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
}

export type HourlyForecast = HourlyWeatherData[][];

export interface DailyWeather {
  time: string;
  weekday: string;
  weatherCode: number;
  temperatureMax: number;
  temperatureMin: number;
  uvIndex: number;
  windSpeedMax: number;
}

export type DailyForecast = DailyWeather[];

// Helper Functions
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

const range = (start: number, stop: number, step: number): number[] =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

// Weather Data Processing Functions
export const processCurrentWeather = (
  current: VariablesWithTime,
  utcOffsetSeconds: number
): CurrentWeather => {
  const currentData: CurrentWeather = {
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
  return currentData;
};

export const processHourlyWeather = (
  hourly: VariablesWithTime,
  utcOffsetSeconds: number
): HourlyForecast => {
  const hourlyTime =
    hourly.time !== null && hourly.timeEnd && hourly.interval
      ? range(
          Number(hourly.time()),
          Number(hourly.timeEnd()),
          hourly.interval()
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000))
      : [];

  const hourlyData: HourlyForecast = [];
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
      precipitationProbability: getHourlyVariable(hourly, 2)?.[i],
      precipitation: getHourlyVariable(hourly, 3)?.[i] || 0,
      cloudCover: getHourlyVariable(hourly, 4)?.[i],
      windSpeed10m: getHourlyVariable(hourly, 5)?.[i],
    });
  });

  if (currentDayData.length > 0) {
    hourlyData.push(currentDayData);
  }

  return hourlyData;
};

export const processDailyWeather = (
  daily: VariablesWithTime,
  utcOffsetSeconds: number
): DailyForecast => {
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
    precipitationSum: getDailyVariable(daily, 5), // Added
    precipitationProbabilityMax: getDailyVariable(daily, 6), // Added
  };

  const weatherArray: DailyForecast = dailyData.time.map((time, i) => ({
    time: time.toISOString(),
    weekday: time.toLocaleDateString("en-US", { weekday: "long" }),
    weatherCode: dailyData.weatherCode[i],
    temperatureMax: Number(dailyData.temperature2mMax[i].toFixed(0)),
    temperatureMin: dailyData.temperature2mMin[i],
    uvIndex: Number(dailyData.uvIndexMax[i].toFixed(1)),
    windSpeedMax: dailyData.windSpeed10mMax[i],
    precipitationSum: dailyData.precipitationSum[i], // Added
    precipitationProbabilityMax: dailyData.precipitationProbabilityMax[i], // Added
  }));

  return weatherArray;
};

// Main Function
export const processWeatherData = (
  current: VariablesWithTime,
  hourly: VariablesWithTime,
  daily: VariablesWithTime,
  utcOffsetSeconds: number
): WeatherDataObject => {
  return {
    currentWeather: processCurrentWeather(current, utcOffsetSeconds),
    hourlyForecast: processHourlyWeather(hourly, utcOffsetSeconds),
    forecast: processDailyWeather(daily, utcOffsetSeconds),
  };
};
