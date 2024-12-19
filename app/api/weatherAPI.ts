import { WeatherDataObject, LocationType } from "@/lib/weatherData";

import {
  validateWeatherResponse,
  getCoordinatesForLocation,
  fetchWeatherData,
  processWeatherData,
} from "@/utils/weatherHelpers";

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
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "is_day",
      "weather_code",
      "wind_speed_10m",
    ],
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "uv_index_max",
      "wind_speed_10m_max",
    ],
    timezone: "auto",
    forecast_days: 14,
  };

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherData(url, params);
  if (!responses || responses.length === 0) {
    throw new WeatherAPIError("No weather data received", "NO_DATA");
  }

  const response = responses[0];
  const current = response.current();
  const daily = response.daily();

  validateWeatherResponse(response, current, daily);

  const utcOffsetSeconds = response.utcOffsetSeconds();

  // Process Weather Data
  const weatherData = processWeatherData(current, daily, utcOffsetSeconds);

  return weatherData;
}
