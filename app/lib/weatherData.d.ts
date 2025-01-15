// Weather Data Types
export type WeatherData = {
  time: string; // ISO string representation of the time
  weekday: string; // Day of the week (e.g., "Monday", "Tuesday")
  weatherCode: number; // Numeric weather code
  temperatureMax: number; // Max temperature (fixed with .toFixed())
  temperatureMin?: number; // Min temperature
  uvIndex?: number; // Max UV index
  windSpeedMax?: number; // Max wind speed
  precipitationSum?: number; // Total precipitation
  precipitationProbabilityMax?: number; // Max precipitation probability
  averageCloudCover?: number | null; // Average cloud cover for the day
};

export type WeatherDataArray = WeatherData[];

// Historical Data
export type HistoricalData = {
  time: string;
};

// Current Weather Data
export type CurrentWeatherData = {
  time: Date; // Date object for the current time
  weekday: string; // Day of the week (e.g., "Monday")
  weatherCode: number; // Weather code
  temperature: number; // Current temperature
  humidity: number; // Relative humidity
  windSpeed: number; // Wind speed
  isDay: number; // 1 for day, 0 for night
};

// Hourly Weather Data
export interface HourlyWeatherData {
  time: string;
  temperature: number;
  weatherCode: number;
  precipitationProbability: number;
  precipitation: number;
  cloudCover: number;
  windSpeed10m: number;
}

// Weather Data Object
export type WeatherDataObject = {
  currentWeather: CurrentWeatherData;
  hourlyForecast: HourlyWeatherData[][];
  forecast: WeatherDataArray;
};

// Weather Icon Object
export type WeatherIconObject = {
  time: string;
  weatherCode: number;
  precipitationProbability: number;
  precipitation: number;
  cloudCover: number;
  windSpeed10m: number;
};

// Location Types
export type LocationType = "male" | "addu" | "maafushi" | "fuvahmulah";

// Variables with Values
export type VariableWithValues = {
  value: () => number; // For current weather variables
  valuesArray?: () => number[]; // For daily weather variables
};

export type VariablesWithTime = {
  variables: (index: number) => VariableWithValues | null; // Allow null
  time: () => number | bigint;
  timeEnd?: () => number; // Optional: If used in daily
  interval?: () => number; // Optional: If used in daily
};
