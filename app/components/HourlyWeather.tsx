import { Sun, CloudRain, Cloud, CloudSun } from "lucide-react";

interface HourlyWeatherProps {
  day: string;
  backgroundImage: string;
  weatherCode: string;
  temperature: number;
}

// Generate mock hourly data based on the day's weatherCode and temperature
const generateHourlyData = (weatherCode: string, temperature: number) => {
  const baseTemp = temperature;
  const hours = [];

  for (let i = 0; i < 24; i++) {
    // Temperature variation throughout the day
    let hourTemp = baseTemp;
    if (i < 6) hourTemp -= 2; // Cooler in early morning
    else if (i > 12 && i < 18) hourTemp += 1; // Warmer in afternoon
    else if (i >= 18) hourTemp -= 1; // Cooling in evening

    // Vary weatherCodes slightly throughout the day
    let hourweatherCode = weatherCode;
    if (i < 6) hourweatherCode = "Partly Cloudy";
    else if (i > 18) hourweatherCode = "Scattered Showers";

    hours.push({
      hour: i,
      temperature: `${hourTemp}°C`,
      weatherCode: hourweatherCode,
    });
  }

  return hours;
};

const getWeatherIcon = (weatherCode: string) => {
  switch (weatherCode.toLowerCase()) {
    case "sunny":
      return <Sun className="w-6 h-6 text-accent" />;
    case "partly cloudy":
      return <CloudSun className="w-6 h-6 text-accent" />;
    case "scattered showers":
      return <CloudRain className="w-6 h-6 text-accent" />;
    default:
      return <Cloud className="w-6 h-6 text-accent" />;
  }
};

export const HourlyWeather = ({
  day,
  backgroundImage,
  weatherCode,
  temperature,
}: HourlyWeatherProps) => {
  const hourlyData = generateHourlyData(weatherCode, temperature);

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
            key={hour.hour}
            className="p-4 rounded-lg bg-primary/30 backdrop-blur-sm hover:bg-primary/40 transition-colors duration-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">
                {hour.hour.toString().padStart(2, "0")}:00
              </span>
              {getWeatherIcon(hour.weatherCode)}
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold">{hour.temperature}</span>
              <p className="text-sm text-muted-foreground mt-1">
                {hour.weatherCode}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
