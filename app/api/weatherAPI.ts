import {
  VariablesWithTime,
  WeatherDataObject,
  LocationType,
} from "@/lib/weatherData";

import { WeatherAPIError } from "@/lib/errors";

import {
  getCoordinatesForLocation,
  fetchWeatherData,
} from "@/utils/weatherHelpers";

import { processWeatherData } from "@/utils/weatherProcessing";

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
