"use client";

import { useEffect, useState } from "react";
import {
  LocationType,
  WeatherDataObject,
  WeatherDataArray,
  WeatherData,
} from "@/lib/weatherData";

import fetchTwoWeekForecastAction from "@/actions/fetchTwoWeekForecast";

// import { WeatherCard } from "@/components/WeatherCard";
import { WeatherMetrics } from "@/components/WeatherMetrics";
import Header from "@/components/Header";
import { LocationSelector } from "@/components/LocationSelector";
import { WeatherCard } from "@/components/WeatherCard";
import { WeatherCardSkeleton } from "@/components/WeatherCardSkeleton";

const Forecast = () => {
  const [selectedLocation, setSelectedLocation] =
    useState<LocationType>("male");

  const [forecastDays] = useState("10");

  const [weatherDataObject, setWeatherDataObject] =
    useState<WeatherDataObject | null>(null);
  const [visibleForecast, setVisibleForecast] =
    useState<WeatherDataArray | null>(null);

  const [metrics, setMetrics] = useState([
    { label: "Humidity", value: "-", icon: "droplets" },
    { label: "Wind Speed", value: "- km/h", icon: "wind" },
    { label: "UV Index", value: "-", icon: "sun" },
  ]);

  useEffect(() => {
    async function getWeather() {
      const data = await fetchTwoWeekForecastAction(selectedLocation);
      if (data) {
        setWeatherDataObject(data);
      }

      console.log(data);
    }

    getWeather();
  }, [selectedLocation]);

  useEffect(() => {
    if (weatherDataObject) {
      const metricsData = [
        {
          label: "Humidity",
          value: `${weatherDataObject.currentWeather.humidity.toString()}%`,
          icon: "droplets",
        },
        {
          label: "Wind Speed",
          value: `${weatherDataObject.currentWeather.windSpeed.toString()} km/h`,
          icon: "wind",
        },
        {
          label: "UV Index",
          value: weatherDataObject?.forecast?.[0]?.uvIndex?.toString() || "N/A",
          icon: "sun",
        },
      ];

      setMetrics(metricsData);
    }
  }, [weatherDataObject]);

  useEffect(() => {
    if (weatherDataObject && weatherDataObject.forecast && forecastDays) {
      const data = weatherDataObject.forecast.slice(0, parseInt(forecastDays));

      if (data) {
        setVisibleForecast(data);
      }
    }
  }, [weatherDataObject, forecastDays]);

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-accent/20 via-primary/20 to-accent/20">
        <div className="flex flex-col items-center w-full  px-4 py-12">
          <div className="flex flex-col max-w-7xl space-y-12 pt-16">
            {/* Header Section */}
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent drop-shadow-lg animate-fade-up">
                Weather Forecast
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
                Detailed weather information for the upcoming week
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-4 max-w-4xl mx-auto">
              <div className="flex gap-4 backdrop-blur-md  p-6 rounded-xl ">
                <LocationSelector
                  selectedLocation={selectedLocation}
                  onLocationChange={setSelectedLocation}
                />
              </div>
            </div>

            <div className="flex flex-col justify-between gap-4  h-auto">
              {/* Weather Card */}
              <div className="flex justify-center">
                <div className="w-full ">
                  {weatherDataObject &&
                  weatherDataObject.forecast.length > 0 ? (
                    <WeatherCard
                      day="Today"
                      time={weatherDataObject.forecast[0].time}
                      temperature={weatherDataObject.forecast[0].temperatureMax}
                      weatherCode={weatherDataObject.forecast[0].weatherCode}
                      hourlyData={weatherDataObject.hourlyForecast[0]}
                      className="transform hover:scale-105 transition-all duration-300"
                      index={1}
                    />
                  ) : (
                    <WeatherCardSkeleton />
                  )}
                </div>
              </div>

              {/* Weather Metrics */}
              <div className="w-full mx-auto">
                <WeatherMetrics metrics={metrics} />
              </div>
            </div>

            {/* Weather Forecast */}
            <div className="space-y-8 w-full max-w-7xl mx-auto">
              <div className="flex flex-col items-center gap-4">
                <h2 className="text-3xl font-semibold text-center text-accent drop-shadow-md">
                  Weather Forecast
                </h2>
              </div>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
                {visibleForecast && weatherDataObject ? (
                  visibleForecast.map((day: WeatherData, index: number) => (
                    <WeatherCard
                      key={index}
                      day={index === 0 ? "Today" : day.weekday}
                      time={weatherDataObject.forecast[index].time}
                      temperature={day.temperatureMax}
                      weatherCode={day.weatherCode}
                      hourlyData={weatherDataObject.hourlyForecast[index]}
                      className="transform hover:scale-105 transition-all duration-300"
                      index={index + 1}
                    />
                  ))
                ) : (
                  <>
                    <WeatherCardSkeleton /> <WeatherCardSkeleton />
                    <WeatherCardSkeleton />
                    <WeatherCardSkeleton />
                    <WeatherCardSkeleton />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forecast;
