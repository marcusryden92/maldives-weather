"use server";

import fetch14DayForecast from "@/api/open-meteo-api";

export default async function fetch14DayForecastAction() {
  const result = await fetch14DayForecast();

  return result;
}
