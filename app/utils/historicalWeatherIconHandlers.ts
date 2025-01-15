import weatherIcons from "@/lib/weather-icons";

import { HistoricalWeatherObject } from "@/lib/weatherData";

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
export function getHistoricalWeatherCode(
  weatherObject: HistoricalWeatherObject
) {
  if (returnDefaultWeatherCode(weatherObject.weatherCode))
    return weatherIcons.find((c) => {
      if (c.code === Number(weatherObject.weatherCode)) {
        return c;
      }
    });

  return getCustomWeatherCode(weatherObject);
}

export const getHistoricalWeatherIcon = (
  weatherObject: HistoricalWeatherObject
) => {
  const isDay =
    new Date(weatherObject.time).getHours() >= 6 &&
    new Date(weatherObject.time).getHours() < 18;
  return getHistoricalWeatherCode(weatherObject)?.[
    isDay ? "icon_day" : "icon_night"
  ];
};

function getCustomWeatherCode(weatherObject: HistoricalWeatherObject) {
  const { precipitationSum, cloudCover, windSpeedMax } = weatherObject;

  const precipitation = precipitationSum / 24;

  if (precipitation > 1) {
    if (precipitation >= 7.6) return weatherIcons[28];
    else if (precipitation >= 2.5) return weatherIcons[27];
    else return weatherIcons[26];
  }

  if (windSpeedMax > 10) {
    if (windSpeedMax > 50) {
      return weatherIcons[53];
    } else if (windSpeedMax > 40) return weatherIcons[52];
    else if (windSpeedMax > 30) return weatherIcons[51];

    return weatherIcons[50];
  }

  if (cloudCover > 95) return weatherIcons[4];
  else if (cloudCover > 80) return weatherIcons[3];
  else if (cloudCover > 50) return weatherIcons[2];
  else if (cloudCover > 30) return weatherIcons[1];
  else return weatherIcons[0];
}
