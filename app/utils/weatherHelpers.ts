import { LocationType } from "@/lib/weatherData";
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
  hourly: string[];
  daily: string[];
  timezone: string;
  forecast_days: number;
};

type HistoricalParams = {
  latitude: number;
  longitude: number;
  timezone: string;
  start_date: string;
  end_date: string;
  daily: string[];
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

// Helper: API call
export const fetchHistoricalDataHelper = async (
  url: string,
  params: HistoricalParams
) => {
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

export function getMonthDateRangeWithFullWeeks(
  year: number,
  month: number
): { startDate: string; endDate: string } {
  // Get the first and last date of the given month
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0); // 0 gives us the last day of the current month

  // Get the day of the week the month starts on (0 is Sunday, 6 is Saturday)
  const startDay = startDate.getDay();
  const endDay = endDate.getDay();

  // Find the previous Monday (start of the week)
  const startMonday = new Date(startDate);
  const daysToPreviousMonday = startDay === 0 ? 6 : startDay - 1; // Monday is 1, Sunday is 0
  startMonday.setDate(startDate.getDate() - daysToPreviousMonday);

  // Find the next Sunday (end of the week)
  const endSunday = new Date(endDate);
  const daysToNextSunday = endDay === 0 ? 0 : 7 - endDay; // Sunday is 0
  endSunday.setDate(endDate.getDate() + daysToNextSunday);

  // Ensure that neither start date nor end date exceeds the current date
  const currentDate = new Date();
  if (startMonday > currentDate) {
    startMonday.setTime(currentDate.getTime());
  }
  if (endSunday > currentDate) {
    endSunday.setTime(currentDate.getTime());
  }

  // Format the dates to "YYYY-MM-DD"
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return {
    startDate: formatDate(startMonday),
    endDate: formatDate(endSunday),
  };
}
