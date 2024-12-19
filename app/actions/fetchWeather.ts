"use server";

import fetchWeather14Days from "@/api/open-meteo-api";

export default async function fetchWeather14DaysAction() {
  const result = await fetchWeather14Days();

  return result;
}
