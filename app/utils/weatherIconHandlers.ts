import weatherIcons from "@/lib/weather-icons";
import { WeatherIconObject } from "@/lib/weatherData";

export function weatherIconHandler() {}

function returnDefaultWeatherCode(code: number) {
  if (
    (code >= 50 && code <= 58) ||
    code === 80 ||
    code === 85 ||
    code === 95 ||
    code === 61
  )
    return false;

  return true;
}

// Get weather code icon and description
export function getWeatherCode(weatherObject: WeatherIconObject) {
  if (returnDefaultWeatherCode(weatherObject.weatherCode))
    return weatherIcons.find((c) => {
      if (c.code === Number(weatherObject.weatherCode)) {
        return c;
      }
    });

  return getCustomWeatherCode(weatherObject);
}

export const getWeatherIcon = (weatherObject: WeatherIconObject) => {
  const isDay =
    new Date(weatherObject.time).getHours() >= 6 &&
    new Date(weatherObject.time).getHours() < 18;
  return getWeatherCode(weatherObject)?.[isDay ? "icon_day" : "icon_night"];
};

function getCustomWeatherCode(weatherObject: WeatherIconObject) {
  const { precipitationProbability, precipitation, cloudCover, windSpeed10m } =
    weatherObject;

  if (precipitationProbability > 40 && precipitation > 1) {
    if (precipitation >= 7.6) return weatherIcons[28];
    else if (precipitation >= 2.5) return weatherIcons[27];
    else return weatherIcons[26];
  }

  if (windSpeed10m > 10) {
    if (windSpeed10m > 50) {
      return weatherIcons[53];
    } else if (windSpeed10m > 40) return weatherIcons[52];
    else if (windSpeed10m > 30) return weatherIcons[51];

    return weatherIcons[50];
  }

  if (cloudCover > 95) return weatherIcons[4];
  else if (cloudCover > 80) return weatherIcons[3];
  else if (cloudCover > 50) return weatherIcons[2];
  else if (cloudCover > 30) return weatherIcons[1];
  else return weatherIcons[0];
}
