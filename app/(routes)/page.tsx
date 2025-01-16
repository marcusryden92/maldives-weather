"use client";

import { useState, useEffect } from "react";
import { WeatherCard } from "@/components/WeatherCard";
import { WeatherMetrics } from "@/components/WeatherMetrics";
import { LocationSelector } from "@/components/LocationSelector";
import Header from "@/components/Header";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { NewsSection } from "@/components/NewsSection";
import { ActivitiesSection } from "@/components/ActivitiesSection";
import { RecommendedResorts } from "@/components/RecommendedResorts";

import fetchTwoWeekForecastAction from "@/actions/fetchTwoWeekForecast";

import { WeatherCardSkeleton } from "@/components/WeatherCardSkeleton";

import ResortCard from "@/components/ResortCard";

// Types
import {
  WeatherDataObject,
  WeatherDataArray,
  LocationType,
  WeatherData,
} from "@/lib/weatherData";

const Index = () => {
  const [selectedLocation, setSelectedLocation] =
    useState<LocationType>("male");

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

  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  const resort = {
    id: 1,
    name: "Sun Siyam Resorts",
    description:
      "Experience luxury overwater villas with stunning sunset views",
    bestMonths: ["January", "February", "March"],
    price: "From $850/night",
    image: "/lovable-uploads/bc91b83b-031c-49dc-bf12-dc893bfd081c.png",
    rating: 4.9,
    link: "https://www.sunsiyam.com/",
  };

  useEffect(() => {
    async function getWeather() {
      const data = await fetchTwoWeekForecastAction(selectedLocation);
      if (data) {
        setWeatherDataObject(data);
      }
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
        /*  {
          label: "Wind Speed",
          value: `${weatherDataObject.currentWeather.windSpeed.toString()} km/h`,
          icon: "wind",
        }, */
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
        <div className="w-full px-8 py-12">
          <div className="space-y-12 pt-16">
            {/* Enhanced Header Section */}
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent drop-shadow-lg animate-fade-up">
                Weather Maldives
              </h1>
              <div
                className="space-y-4 animate-fade-up"
                style={{ animationDelay: "0.2s" }}
              >
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
                  Experience paradise through our detailed weather forecasts
                </p>
                {/*  <p className="text-base text-muted-foreground/80 max-w-3xl mx-auto">
                  Stay informed with real-time weather updates, accurate
                  forecasts, and essential travel insights for the Maldives.
                  Whether you&apos;re planning a beach vacation, water sports
                  activities, or simply exploring the islands, we provide
                  comprehensive weather information to help you make the most of
                  your Maldivian experience.
                </p> */}
              </div>
            </div>
            {/* Location and Month Selection */}
            <div className="flex flex-col  justify-center gap-4 max-w-4xl mx-auto">
              <div className="flex gap-4 backdrop-blur-md  p-6 rounded-xl ">
                <LocationSelector
                  selectedLocation={selectedLocation}
                  onLocationChange={setSelectedLocation}
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-8  w-full max-w-7xl mx-auto">
              <div className="flex flex-col justify-between gap-4 lg:w-[80%] h-auto">
                {/* Weather Card */}
                <div className="flex justify-center">
                  <div className="w-full ">
                    {weatherDataObject &&
                    weatherDataObject.forecast.length > 0 ? (
                      <WeatherCard
                        day="Today"
                        time={weatherDataObject.forecast[0].time}
                        temperature={
                          weatherDataObject.forecast[0].temperatureMax
                        }
                        precipitationSum={
                          weatherDataObject.forecast[0].precipitationSum || 0
                        }
                        precipitationProbabilityMax={
                          weatherDataObject.forecast[0]
                            .precipitationProbabilityMax || 0
                        }
                        windSpeedMax={
                          weatherDataObject.forecast[0].windSpeedMax || 0
                        }
                        cloudCover={
                          weatherDataObject.forecast[0].averageCloudCover || 0
                        }
                        weatherCode={weatherDataObject.forecast[0].weatherCode}
                        hourlyData={weatherDataObject.hourlyForecast[0]}
                        className="transform hover:scale-105 transition-all duration-300"
                        index={1}
                        mainCard
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
              <div className="hidden lg:flex">
                <ResortCard resort={resort} currentMonth={currentMonth} />
              </div>
            </div>

            {/* Weather Forecast */}
            <div className="space-y-8 w-full max-w-7xl mx-auto">
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

              <div className="w-full grid grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
                {visibleForecast && weatherDataObject ? (
                  visibleForecast.map((day: WeatherData, index: number) => (
                    <WeatherCard
                      key={index}
                      day={index === 0 ? "Today" : day.weekday}
                      time={weatherDataObject.forecast[index].time}
                      temperature={day.temperatureMax}
                      weatherCode={day.weatherCode}
                      precipitationSum={day.precipitationSum || 0}
                      precipitationProbabilityMax={
                        day.precipitationProbabilityMax || 0
                      }
                      cloudCover={day.averageCloudCover || 0}
                      windSpeedMax={day.windSpeedMax || 0}
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

            <div className="flex lg:hidden justify-self-center">
              <ResortCard resort={resort} currentMonth={currentMonth} />
            </div>

            {/* Activities Section */}
            <ActivitiesSection />

            {/* Add the new RecommendedResorts section */}
            <RecommendedResorts />

            {/* News Section */}
            <NewsSection limit={4} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
