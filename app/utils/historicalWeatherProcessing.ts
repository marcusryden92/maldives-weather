import { getDailyVariable } from "./weatherHelpers";
import { VariablesWithTime } from "@/lib/weatherData";
import { WeatherDataArray } from "@/lib/weatherData";

// Helper: Process Historical Weather Data
export const processHistoricalWeatherData = (
  daily: VariablesWithTime,
  utcOffsetSeconds: number
) => {
  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  // Process daily historical data
  const dailyTime =
    daily.time !== null && daily.timeEnd && daily.interval
      ? range(
          Number(daily.time()),
          Number(daily.timeEnd()),
          daily.interval()
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000))
      : [];

  const dailyData = {
    time: dailyTime,
    weatherCode: getDailyVariable(daily, 0),
    temperature2mMax: getDailyVariable(daily, 1),
  };

  const historicalArray: WeatherDataArray = dailyData.time.map((time, i) => ({
    time: time.toISOString(),
    weekday: time.toLocaleDateString("en-US", { weekday: "long" }),
    weatherCode: dailyData.weatherCode[i],
    temperatureMax: Number(dailyData.temperature2mMax[i].toFixed(0)),
  }));

  return {
    historicalData: historicalArray,
  };
};
