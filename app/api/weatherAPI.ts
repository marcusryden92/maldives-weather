import {
  WeatherDataObject,
  LocationType,
  HistoricalWeatherObject,
} from "@/lib/weatherData";
import { VariablesWithTime } from "@/lib/weatherData";

import {
  getCoordinatesForLocation,
  fetchWeatherData,
  fetchHistoricalDataHelper,
  getMonthDateRangeWithFullWeeks,
} from "@/utils/weatherHelpers";

import { processHistoricalWeatherData } from "@/utils/historicalWeatherProcessing";

import { processWeatherData } from "@/utils/weatherProcessing";

// Custom Error Class
export class WeatherAPIError extends Error {
  constructor(message: string, public readonly code?: string) {
    super(message);
    this.name = "WeatherAPIError";
  }
}

// Main function: Fetch Two Week Forecast
export default async function fetchTwoWeekForecast(
  location: LocationType
): Promise<WeatherDataObject | null> {
  const coordinates = getCoordinatesForLocation(location);
  const params = {
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    hourly: [
      "temperature_2m",
      "weather_code",
      "precipitation_probability",
      "precipitation",
      "cloud_cover",
      "wind_speed_10m",
      "visibility",
    ],
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "is_day",
      "weather_code",
      "wind_speed_10m",
      "precipitation",
      "cloud_cover",
    ],
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "uv_index_max",
      "wind_speed_10m_max",
      "precipitation_sum",
      "precipitation_probability_max",
    ],
    timezone: "auto",
    forecast_days: 14,
    cell_selection: "nearest",

    // models: "ukmo_seamless",

    // models: "bom_access_global",
    // models: "meteofrance_seamless",
    // models: "cma_grapes_global",
  };

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherData(url, params);
  if (!responses || responses.length === 0) {
    throw new WeatherAPIError("No weather data received", "NO_DATA");
  }

  const response = responses[0];
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const current = response.current() as VariablesWithTime | null;
  const hourly = response.hourly() as VariablesWithTime | null;
  const daily = response.daily() as VariablesWithTime | null;

  if (!current || !hourly || !daily) {
    throw new WeatherAPIError(
      "Incomplete weather data received",
      "INCOMPLETE_DATA"
    );
  }

  // Process Weather Data
  const weatherData = processWeatherData(
    current,
    hourly,
    daily,
    utcOffsetSeconds
  );

  console.log(weatherData);

  return weatherData;
}

export async function fetchHistoricalData(
  location: LocationType,
  year: number,
  month: number
): Promise<{ historicalData: HistoricalWeatherObject[] } | null> {
  const coordinates = getCoordinatesForLocation(location);
  const dateRange = getMonthDateRangeWithFullWeeks(year, month);

  const params = {
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    timezone: "auto",
    start_date: dateRange.startDate,
    end_date: dateRange.endDate,
    hourly: ["cloud_cover"], // Request hourly cloud_cover data
    daily: [
      "weather_code",
      "temperature_2m_max",
      "precipitation_sum",
      "wind_speed_10m_max",
    ],
  };

  const url = "https://historical-forecast-api.open-meteo.com/v1/forecast";
  const responses = await fetchHistoricalDataHelper(url, params);

  if (!responses || responses.length === 0) {
    throw new WeatherAPIError("No weather data received", "NO_DATA");
  }

  const response = responses[0];
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const daily = response.daily() as VariablesWithTime | null;
  const hourly = response.hourly() as VariablesWithTime | null; // Assuming this is how you access the hourly data

  if (!daily || !hourly) {
    throw new WeatherAPIError(
      "Incomplete weather data received",
      "INCOMPLETE_DATA"
    );
  }

  // Process the data, including calculating daily cloud cover averages
  const weatherData = processHistoricalWeatherData(
    daily,
    hourly,
    utcOffsetSeconds
  );

  return weatherData;
}
