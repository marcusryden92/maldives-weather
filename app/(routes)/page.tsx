"use client";

import { useState, useEffect } from "react";
import { WeatherCard } from "@/components/WeatherCard";
import { WeatherMetrics } from "@/components/WeatherMetrics";
import { LocationSelector } from "@/components/LocationSelector";
import Header from "@/components/Header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { NewsSection } from "@/components/NewsSection";
import { ActivitiesSection } from "@/components/ActivitiesSection";
import { RecommendedResorts } from "@/components/RecommendedResorts";

import fetch14DayForecastAction from "@/actions/fetchWeather";

import { WeatherCardSkeleton } from "@/components/WeatherCardSkeleton";

// Types
import {
  WeatherDataObject,
  WeatherDataArray,
  LocationType,
} from "@/lib/weatherData";

/* const weatherDataObject = {
  current: {
    temperature: "29°C",
    condition: "Partly Cloudy",
    humidity: "75%",
    windSpeed: "12 km/h",
    uvIndex: "High",
  },
  forecast: [
    {
      day: "Today",
      temperature: "29°C",
      condition: "Partly Cloudy",
      icon: "partly-cloudy",
    },
    { day: "Tomorrow", temperature: "28°C", condition: "Sunny", icon: "sunny" },
    {
      day: "Wednesday",
      temperature: "27°C",
      condition: "Scattered Showers",
      icon: "scattered-showers",
    },
    { day: "Thursday", temperature: "28°C", condition: "Sunny", icon: "sunny" },
    {
      day: "Friday",
      temperature: "29°C",
      condition: "Partly Cloudy",
      icon: "partly-cloudy",
    },
    { day: "Saturday", temperature: "30°C", condition: "Sunny", icon: "sunny" },
    {
      day: "Sunday",
      temperature: "28°C",
      condition: "Scattered Showers",
      icon: "scattered-showers",
    },
    {
      day: "Monday",
      temperature: "27°C",
      condition: "Partly Cloudy",
      icon: "partly-cloudy",
    },
    { day: "Tuesday", temperature: "29°C", condition: "Sunny", icon: "sunny" },
    {
      day: "Wednesday",
      temperature: "28°C",
      condition: "Partly Cloudy",
      icon: "partly-cloudy",
    },
  ],
}; */

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Index = () => {
  const [selectedLocation, setSelectedLocation] =
    useState<LocationType>("male");
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().getMonth().toString()
  );
  const [forecastDays, setForecastDays] = useState("5");

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
      const data = await fetch14DayForecastAction(selectedLocation);
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
          value: weatherDataObject.currentWeather.uvIndex.toString(),
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
        <div className="w-full px-4 py-12">
          <div className="space-y-12 pt-16">
            {/* Enhanced Header Section */}
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent drop-shadow-lg animate-fade-up">
                Maldives Weather
              </h1>
              <div
                className="space-y-4 animate-fade-up"
                style={{ animationDelay: "0.2s" }}
              >
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
                  Experience paradise through our detailed weather forecasts
                </p>
                <p className="text-base text-muted-foreground/80 max-w-3xl mx-auto">
                  Stay informed with real-time weather updates, accurate
                  forecasts, and essential travel insights for the Maldives.
                  Whether you're planning a beach vacation, water sports
                  activities, or simply exploring the islands, we provide
                  comprehensive weather information to help you make the most of
                  your Maldivian experience.
                </p>
              </div>
            </div>

            {/* Location and Month Selection */}
            <div className="flex flex-col md:flex-row justify-center gap-4 max-w-4xl mx-auto">
              <div className="w-full md:w-64 backdrop-blur-md bg-white/20 p-6 rounded-xl shadow-lg">
                <LocationSelector onLocationChange={setSelectedLocation} />
              </div>
              <div className="w-full md:w-64 backdrop-blur-md bg-white/20 p-6 rounded-xl shadow-lg">
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-full backdrop-blur-sm bg-white/80 border-white/20 text-gray-800 font-medium">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-md border-white/20">
                    {months.map((month, index) => (
                      <SelectItem
                        key={index}
                        value={index.toString()}
                        className="text-gray-800 hover:bg-accent/20 focus:bg-accent/20"
                      >
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Weather Card */}
            <div className="flex justify-center px-4">
              <div className="w-full max-w-4xl">
                {weatherDataObject && weatherDataObject.forecast.length > 0 ? (
                  <WeatherCard
                    day="Today"
                    temperature={weatherDataObject.forecast[0].temperatureMax}
                    weatherCode={weatherDataObject.forecast[0].weatherCode}
                    className="transform hover:scale-105 transition-all duration-300"
                    index={1}
                  />
                ) : (
                  <WeatherCardSkeleton />
                )}
              </div>
            </div>

            {/* Weather Metrics */}
            <div className="max-w-6xl mx-auto px-4">
              <WeatherMetrics metrics={metrics} />
            </div>

            {/* Weather Forecast */}
            <div className="space-y-8 px-4 w-full">
              <div className="flex flex-col items-center gap-4">
                <h2 className="text-3xl font-semibold text-center text-accent drop-shadow-md">
                  Weather Forecast
                </h2>
                <ToggleGroup
                  type="single"
                  value={forecastDays}
                  onValueChange={(value) => value && setForecastDays(value)}
                  className="bg-white/20 backdrop-blur-md p-1 rounded-lg"
                >
                  <ToggleGroupItem value="5" className="px-6">
                    5 Days
                  </ToggleGroupItem>
                  <ToggleGroupItem value="10" className="px-6">
                    10 Days
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
                {visibleForecast ? (
                  visibleForecast.map((day: any, index: number) => (
                    <WeatherCard
                      key={index}
                      day={index === 0 ? "Today" : day.weekday}
                      temperature={day.temperatureMax}
                      weatherCode={day.weatherCode}
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

            {/* News Section */}
            <NewsSection limit={4} />

            {/* Activities Section */}
            <ActivitiesSection />

            {/* Add the new RecommendedResorts section */}
            <RecommendedResorts />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
