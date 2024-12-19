export type WeatherData = {
  time: string; // ISO string representation of the time
  weekday: string; // Day of the week (e.g., "Monday", "Tuesday")
  weatherCode: number; // Numeric weather code (this will depend on how weather codes are structured)
  temperatureMax: string; // Max temperature, as a string because it’s fixed with .toFixed()
  temperatureMin: number; // Min temperature, as a number
  uvIndex: number; // Max UV index, a number
  windSpeedMax: number; // Max wind speed, a number
};

export type WeatherDataArray = WeatherData[];
