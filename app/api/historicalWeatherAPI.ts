import {
  LocationType,
  VariablesWithTime,
  WeatherData,
  WeatherAPIError,
} from "@/lib/weatherData";
import {
  getCoordinatesForLocation,
  getMonthDateRangeWithFullWeeks,
  fetchHistoricalDataHelper,
} from "@/utils/weatherHelpers";

import { processHistoricalWeatherData } from "@/utils/historicalWeatherProcessing";

export async function fetchHistoricalData(
  location: LocationType,
  year: number,
  month: number
): Promise<{ historicalData: WeatherData[] } | null> {
  const coordinates = getCoordinatesForLocation(location);
  const dateRange = getMonthDateRangeWithFullWeeks(year, month);

  const params = {
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    timezone: "auto",
    start_date: dateRange.startDate,
    end_date: dateRange.endDate,
    daily: ["weather_code", "temperature_2m_max"],
  };

  const url = "https://historical-forecast-api.open-meteo.com/v1/forecast";
  const responses = await fetchHistoricalDataHelper(url, params);
  if (!responses || responses.length === 0) {
    throw new WeatherAPIError("No weather data received", "NO_DATA");
  }

  const response = responses[0];
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const daily = response.daily() as VariablesWithTime | null;

  if (!daily) {
    throw new WeatherAPIError(
      "Incomplete weather data received",
      "INCOMPLETE_DATA"
    );
  }

  // Process Weather Data
  const weatherData = processHistoricalWeatherData(daily, utcOffsetSeconds);

  return weatherData;
}
