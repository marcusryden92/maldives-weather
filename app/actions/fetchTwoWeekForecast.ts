"use server";

import fetchTwoWeekForecast from "@/api/weatherAPI";

import { LocationType } from "@/lib/weatherData";

export default async function fetchTwoWeekForecastAction(
  location: LocationType
) {
  const result = await fetchTwoWeekForecast(location);

  return result;
}
