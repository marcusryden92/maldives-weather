import { fetchWeatherApi } from "openmeteo";

export default async function fetch14DayForecast() {
  const params = {
    latitude: 4.1752,
    longitude: 73.5092,
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
  const responses = await fetchWeatherApi(url, params);

  // Helper function to form time ranges
  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  /* 
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const latitude = response.latitude();
  const longitude = response.longitude(); 
  */

  const daily = response.daily()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    daily: {
      time: range(
        Number(daily.time()),
        Number(daily.timeEnd()),
        daily.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      weatherCode: daily.variables(0)!.valuesArray()!,
      temperature2mMax: daily.variables(1)!.valuesArray()!,
      temperature2mMin: daily.variables(2)!.valuesArray()!,
      uvIndexMax: daily.variables(3)!.valuesArray()!,
      windSpeed10mMax: daily.variables(4)!.valuesArray()!,
    },
  };

  let weatherArray = [];

  // `weatherData` now contains a simple structure with arrays for datetime and weather data
  for (let i = 0; i < weatherData.daily.time.length; i++) {
    const day = {
      time: weatherData.daily.time[i].toISOString(),
      weekday: weatherData.daily.time[i].toLocaleDateString("en-US", {
        weekday: "long",
      }),
      weatherCode: weatherData.daily.weatherCode[i],
      temperatureMax: weatherData.daily.temperature2mMax[i].toFixed(0),
      temperatureMin: weatherData.daily.temperature2mMin[i],
      uvIndex: weatherData.daily.uvIndexMax[i],
      windSpeedMax: weatherData.daily.windSpeed10mMax[i],
    };
    weatherArray.push(day);
  }

  return weatherArray;
}
