import { HourlyWeatherData } from "@/lib/weatherData";

import { formatHourString } from "@/utils/formatting";
import { getWeatherCode } from "@/utils/weatherHelpers";

import Image from "next/image";

interface HourlyWeatherProps {
  day: string;
  backgroundImage: string;
  hourlyData: HourlyWeatherData[];
}

const getWeatherIcon = (weatherCode: number, time: string) => {
  const isDay =
    new Date(time).getHours() >= 6 && new Date(time).getHours() < 18;
  return getWeatherCode(weatherCode)?.[isDay ? "icon_day" : "icon_night"];
};

export const HourlyWeather = ({
  day,
  backgroundImage,
  hourlyData,
}: HourlyWeatherProps) => {
  return (
    <div className="space-y-6">
      <div
        className="w-full h-40 rounded-lg relative overflow-hidden"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <h3 className="text-4xl font-bold text-white">{day}</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {hourlyData.map((hour) => (
          <div
            key={hour.time}
            className="p-4 rounded-lg bg-primary/30 backdrop-blur-sm hover:bg-primary/40 transition-colors duration-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">
                {formatHourString(hour.time)}
              </span>
              {}
              <Image
                src={`/weather-icons/${getWeatherIcon(
                  Number(hour.weatherCode),
                  hour.time
                )}`}
                alt={
                  getWeatherCode(Number(hour.weatherCode))?.description ||
                  "Weather icon"
                }
                width={80}
                height={80}
                priority={true}
              />
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold">{hour.temperature}</span>
              <p className="text-sm text-muted-foreground mt-1">
                {getWeatherCode(Number(hour.weatherCode))?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
