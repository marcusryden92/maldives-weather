// "use server";

import { fetchHistoricalData } from "@/api/weatherAPI";
import { LocationType } from "@/lib/weatherData";

export default async function fetchHistoricalDataAction(
  location: LocationType,
  year: number,
  month: number
) {
  try {
    const result = await fetchHistoricalData(location, year, month);
    return result;
  } catch (error) {
    console.error("Failed to fetch forecast action:", error);
    return null;
  }
}
