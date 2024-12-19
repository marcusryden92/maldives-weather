import { fetchWeatherApi } from "openmeteo";
import {
  WeatherDataObject,
  WeatherDataArray,
  LocationType,
} from "@/lib/weatherData";

export class WeatherAPIError extends Error {
  constructor(message: string, public readonly code?: string) {
    super(message);
    this.name = "WeatherAPIError";
  }
}

export default async function fetch14DayForecast(
  location: LocationType
): Promise<WeatherDataObject | null> {
  let coordinates = { latitude: 0, longitude: 0 };

  switch (location) {
    case "male":
      coordinates = { latitude: 4.1752, longitude: 73.5092 };
      break;
    case "addu":
      coordinates = { latitude: -0.6413, longitude: 73.158 };
      break;
    case "maafushi":
      coordinates = { latitude: 3.9423, longitude: 73.4907 };
      break;
    case "fuvahmulah":
      coordinates = { latitude: -0.2988, longitude: 73.424 };
  }

  try {
    const params = {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "is_day",
        "weather_code",
        "wind_speed_10m",
      ],
      daily: [
        "weather_code",
        "temperature_2m_max",
        "temperature_2m_min",
        "uv_index_max",
        "wind_speed_10m_max",
      ],
      timezone: "auto",
      forecast_days: 14,
    };

    const url = "https://api.open-meteo.com/v1/forecast";

    // API call error handling
    let responses;
    try {
      responses = await fetchWeatherApi(url, params);
    } catch (error) {
      throw new WeatherAPIError(
        `Failed to fetch weather data: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        "API_FETCH_ERROR"
      );
    }

    if (!responses || responses.length === 0) {
      throw new WeatherAPIError("No weather data received", "NO_DATA");
    }

    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    const response = responses[0];

    // Validate response data
    const current = response.current();
    const daily = response.daily();

    if (!current || !daily) {
      throw new WeatherAPIError(
        "Missing current or daily weather data",
        "INVALID_DATA"
      );
    }

    const utcOffsetSeconds = response.utcOffsetSeconds();

    // Safely access weather variables with null checks
    const getCurrentVariable = (index: number) => {
      const variable = current.variables(index);
      if (!variable) {
        throw new WeatherAPIError(
          `Missing current weather variable at index ${index}`,
          "MISSING_VARIABLE"
        );
      }
      return variable.value();
    };

    const getDailyVariable = (index: number) => {
      const variable = daily.variables(index);
      if (!variable) {
        throw new WeatherAPIError(
          `Missing daily weather variable at index ${index}`,
          "MISSING_VARIABLE"
        );
      }
      const values = variable.valuesArray();
      if (!values) {
        throw new WeatherAPIError(
          `No values array for daily variable at index ${index}`,
          "MISSING_VALUES"
        );
      }
      return values;
    };

    const weatherData = {
      current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature2m: getCurrentVariable(0),
        relativeHumidity2m: getCurrentVariable(1),
        isDay: getCurrentVariable(2),
        weatherCode: getCurrentVariable(3),
        windSpeed10m: getCurrentVariable(4),
      },
      daily: {
        time: range(
          Number(daily.time()),
          Number(daily.timeEnd()),
          daily.interval()
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        weatherCode: getDailyVariable(0),
        temperature2mMax: getDailyVariable(1),
        temperature2mMin: getDailyVariable(2),
        uvIndexMax: getDailyVariable(3),
        windSpeed10mMax: getDailyVariable(4),
      },
    };

    // Validate date objects
    if (isNaN(weatherData.current.time.getTime())) {
      throw new WeatherAPIError("Invalid current time value", "INVALID_TIME");
    }

    const currentData = {
      time: weatherData.current.time,
      weekday: weatherData.current.time.toLocaleDateString("en-US", {
        weekday: "long",
      }),
      weatherCode: weatherData.current.weatherCode,
      temperature: Number(weatherData.current.temperature2m.toFixed(0)),
      humidity: weatherData.current.relativeHumidity2m,
      uvIndex: Number(weatherData.daily.uvIndexMax[0].toFixed(1)),
      windSpeed: Number(weatherData.current.windSpeed10m.toFixed(0)),
      isDay: weatherData.current.isDay,
    };

    const weatherArray: WeatherDataArray = [];

    // Safely process daily forecast data
    for (let i = 0; i < weatherData.daily.time.length; i++) {
      const time = weatherData.daily.time[i];

      if (isNaN(time.getTime())) {
        throw new WeatherAPIError(
          `Invalid time value at index ${i}`,
          "INVALID_TIME"
        );
      }

      const day = {
        time: time.toISOString(),
        weekday: time.toLocaleDateString("en-US", { weekday: "long" }),
        weatherCode: weatherData.daily.weatherCode[i],
        temperatureMax: Number(
          weatherData.daily.temperature2mMax[i].toFixed(0)
        ),
        temperatureMin: weatherData.daily.temperature2mMin[i],
        uvIndex: weatherData.daily.uvIndexMax[i],
        windSpeedMax: weatherData.daily.windSpeed10mMax[i],
      };
      weatherArray.push(day);
    }

    const weatherDataObject: WeatherDataObject = {
      currentWeather: currentData,
      forecast: weatherArray,
    };

    return weatherDataObject;
  } catch (error) {
    // Log the error for monitoring/debugging
    console.error("Weather API Error:", error);

    // Optionally, you could handle different error types differently
    if (error instanceof WeatherAPIError) {
      // Handle specific API errors
      // You could throw the error again or return null depending on your needs
      console.error(`Weather API Error (${error.code}):`, error.message);
    }

    // Return null to indicate failure
    return null;
  }
}
