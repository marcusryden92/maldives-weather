import { VariablesWithTime } from "@/lib/weatherData";
import { HistoricalWeatherObject } from "@/lib/weatherData";

// Custom error class for API errors
export class WeatherAPIError extends Error {
  constructor(message: string, public readonly code?: string) {
    super(message);
    this.name = "WeatherAPIError";
  }
}

// Helper function to get daily variables by index
const getDailyVariable = (
  daily: VariablesWithTime,
  index: number
): number[] => {
  const variable = daily.variables(index);
  if (!variable) {
    throw new WeatherAPIError(
      `Missing daily weather variable at index ${index}`,
      "MISSING_VARIABLE"
    );
  }
  return variable.valuesArray ? variable.valuesArray() : [];
};

// Map weather variable names to their corresponding indices
const variableIndexMap: { [key: string]: number } = {
  weather_code: 0,
  temperature2m_max: 1,
  precipitation_sum: 2,
  wind_speed10m_max: 3,
  cloud_cover: 4, // Example, change to the actual index for cloud cover
};

// Main function to process historical weather data
export const processHistoricalWeatherData = (
  daily: VariablesWithTime,
  hourly: VariablesWithTime, // Add hourly parameter
  utcOffsetSeconds: number
) => {
  const range = (start: number, stop: number, step: number) =>
    Array.from(
      { length: Math.floor((stop - start) / step) },
      (_, i) => start + i * step
    );

  const dailyTimeArray = daily.time?.() || [];
  const startTime =
    Array.isArray(dailyTimeArray) && dailyTimeArray.length > 0
      ? Number(dailyTimeArray[0])
      : 0;

  const dailyTime =
    daily.time && Array.isArray(daily.time()) && daily.timeEnd && daily.interval
      ? range(startTime, Number(daily.timeEnd()), daily.interval()).map(
          (t: number) => new Date((t + utcOffsetSeconds) * 1000)
        )
      : [];

  // Get hourly cloud cover data
  // Get hourly cloud cover data
  const hourlyCloudCover = getHourlyVariable(
    hourly,
    variableIndexMap["cloud_cover"] // Retrieve the numerical index for "cloud_cover"
  );

  console.log("hourlycloudcover: ", hourlyCloudCover);

  const hourlyDataLength = hourlyCloudCover.length;

  // Create daily data structure
  const dailyData = {
    time: dailyTime,
    weatherCode: getDailyVariable(daily, variableIndexMap["weather_code"]),
    temperature2mMax: getDailyVariable(
      daily,
      variableIndexMap["temperature2m_max"]
    ),
    precipitationSum: getDailyVariable(
      daily,
      variableIndexMap["precipitation_sum"]
    ),
    windSpeed10mMax: getDailyVariable(
      daily,
      variableIndexMap["wind_speed10m_max"]
    ),
    cloudCover: calculateDailyCloudCover(hourlyCloudCover, hourlyDataLength), // Aggregate hourly data into daily averages
  };

  // Map the processed data into HistoricalWeatherObject format
  const historicalArray: HistoricalWeatherObject[] = dailyData.time.map(
    (time, i) => ({
      time: time.toISOString(),
      weekday: time.toLocaleDateString("en-US", { weekday: "long" }),
      weatherCode: dailyData.weatherCode[i],
      temperatureMax: Number(dailyData.temperature2mMax[i].toFixed(0)),
      precipitationSum: dailyData.precipitationSum[i],
      windSpeedMax: dailyData.windSpeed10mMax[i],
      cloudCover: dailyData.cloudCover[i],
    })
  );

  console.log(historicalArray);

  return {
    historicalData: historicalArray,
  };
};

// Function to extract hourly cloud cover data from hourly data
export const getHourlyVariable = (
  hourly: VariablesWithTime,
  index: number
): number[] => {
  const variable = hourly.variables(index);
  if (!variable) {
    throw new WeatherAPIError(
      `Missing hourly weather variable at index ${index}`,
      "MISSING_VARIABLE"
    );
  }

  if (variable.valuesArray) {
    console.log("valuesArray: ", variable.valuesArray());
  } else {
    console.warn(`valuesArray is not available for index ${index}`);
  } // Return the values array directly if available.
  return variable.valuesArray ? variable.valuesArray() : [];
};

// Function to aggregate hourly cloud cover data into daily averages
const calculateDailyCloudCover = (
  cloudCoverData: number[],
  length: number
): number[] => {
  const dailyAverages: number[] = [];

  // Assuming 24 hourly data points per day
  for (let i = 0; i < length; i += 24) {
    // Slice out hourly data for one day
    const dailyValues = cloudCoverData.slice(i, i + 24);
    const dailyAvg =
      dailyValues.reduce((sum, value) => sum + value, 0) / dailyValues.length; // Calculate daily average
    dailyAverages.push(dailyAvg);
  }

  return dailyAverages;
};
