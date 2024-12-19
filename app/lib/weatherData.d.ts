export type WeatherData = {
  time: string; // ISO string representation of the time
  weekday: string; // Day of the week (e.g., "Monday", "Tuesday")
  weatherCode: number; // Numeric weather code (this will depend on how weather codes are structured)
  temperatureMax: number; // Max temperature, as a string because it’s fixed with .toFixed()
  temperatureMin: number; // Min temperature, as a number
  uvIndex: number; // Max UV index, a number
  windSpeedMax: number; // Max wind speed, a number
};

export type WeatherDataArray = WeatherData[];

export type CurrentWeatherData = {
  time: Date; // Assuming `weatherData.current.time` is a Date object
  weekday: string; // Assuming the result of `toLocaleDateString` is a string
  weatherCode: number; // Assuming `weatherData.current.weatherCode` is a number
  temperature: number; // Assuming `weatherData.current.temperature2m` is a number
  humidity: number; // Assuming `weatherData.current.relativeHumidity2m` is a number
  uvIndex: number; // Assuming `weatherData.daily.uvIndexMax[0]` is a number
  windSpeed: number; // Assuming `weatherData.current.windSpeed10m` is a number
  isDay: number; // Assuming `weatherData.current.isDay` is a number (e.g., 1 for day, 0 for night)
};

export type WeatherDataObject = {
  currentWeather: CurrentWeatherData;
  forecast: WeatherDataArray;
};
