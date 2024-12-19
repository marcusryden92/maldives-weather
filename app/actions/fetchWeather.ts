"use server";

import fetch14DayForecast from "@/api/open-meteo-api";

import { LocationType } from "@/lib/weatherData";

export default async function fetch14DayForecastAction(location: LocationType) {
  const result = await fetch14DayForecast(location);

  return result;
}
