import { getDailyVariable, getHourlyVariable } from "./weatherHelpers";
import { VariablesWithTime } from "@/lib/weatherData";
import { WeatherDataArray } from "@/lib/weatherData";

// Helper: Process Historical Weather Data
export const processHistoricalWeatherData = (
  daily: VariablesWithTime,
  hourly: VariablesWithTime | null,
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
    precipitationSum: getDailyVariable(daily, 2),
    windSpeed10mMax: getDailyVariable(daily, 3),
  };

  // Calculate daily average cloud cover if hourly data is available
  const dailyCloudCoverAvg = dailyData.time.map((date) => {
    if (!hourly || !hourly.time || !hourly.interval || !hourly.timeEnd) {
      return null; // If no hourly data, return null for average cloud cover
    }

    const startOfDay = date.getTime() / 1000 - utcOffsetSeconds;
    const endOfDay = startOfDay + 24 * 60 * 60;

    const hourlyTime = range(
      Number(hourly.time()),
      Number(hourly.timeEnd()),
      hourly.interval()
    );

    const hourlyCloudCover = getHourlyVariable(hourly, 0);

    // Filter hourly data to include only values within the current day
    const dailyCloudCoverValues = hourlyTime
      .map((time, i) =>
        time >= startOfDay && time < endOfDay ? hourlyCloudCover[i] : null
      )
      .filter((value) => value !== null) as number[];

    // Calculate average cloud cover for the day
    const avgCloudCover =
      dailyCloudCoverValues.length > 0
        ? dailyCloudCoverValues.reduce((sum, val) => sum + val, 0) /
          dailyCloudCoverValues.length
        : null;

    return avgCloudCover !== null ? Number(avgCloudCover.toFixed(2)) : null;
  });

  const historicalArray: WeatherDataArray = dailyData.time.map((time, i) => ({
    time: time.toISOString(),
    weekday: time.toLocaleDateString("en-US", { weekday: "long" }),
    weatherCode: dailyData.weatherCode[i],
    temperatureMax: Number(dailyData.temperature2mMax[i].toFixed(0)),
    precipitation: Number(dailyData.precipitationSum[i].toFixed(2)),
    windSpeedMax: Number(dailyData.windSpeed10mMax[i].toFixed(1)),
    averageCloudCover: dailyCloudCoverAvg[i],
  }));

  return {
    historicalData: historicalArray,
  };
};
