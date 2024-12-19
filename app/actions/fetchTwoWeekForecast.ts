"use server";

import fetchTwoWeekForecast from "@/api/weatherAPI";
import { LocationType } from "@/lib/weatherData";

export default async function fetchTwoWeekForecastAction(
  location: LocationType
) {
  try {
    const result = await fetchTwoWeekForecast(location);
    return result;
  } catch (error) {
    console.error("Failed to fetch forecast action:", error);
    return null;
  }
}
