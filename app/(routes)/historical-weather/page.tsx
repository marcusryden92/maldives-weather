"use client";

import { useEffect, useState } from "react";
import { LocationType, WeatherData } from "@/lib/weatherData";
import fetchHistoricalDataAction from "@/actions/fetchHistoricalData";
import Header from "@/components/Header";
import Image from "next/image";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";

import {
  getCurrentYear,
  getCurrentMonth,
  convertDateFormat,
} from "@/utils/formatting";
import { getWeatherCode } from "@/utils/weatherIconHandlers";
import HistoricalSkeleton from "./HistoricalSkeleton";

const Forecast = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>("male");

  const locations = [
    { id: "male", name: "Malé" },
    { id: "addu", name: "Addu City" },
    { id: "maafushi", name: "Maafushi" },
    { id: "fuvahmulah", name: "Fuvahmulah" },
  ];

  const [currentMonth] = useState<number>(getCurrentMonth());
  const [currentYear] = useState<number>(getCurrentYear());

  const [selectedMonth, setSelectedMonth] = useState(
    (currentMonth - 1).toString()
  );
  const [selectedYear, setSelectedYear] = useState<string>(
    (currentYear - 1).toString()
  );

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

  const years = [
    currentYear - 3,
    currentYear - 2,
    currentYear - 1,
    currentYear,
  ];

  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [weatherDataObject, setWeatherDataObject] = useState<{
    historicalData: WeatherData[];
  } | null>(null);

  useEffect(() => {
    // Reset weatherDataObject when selections change
    setWeatherDataObject(null);

    // If we're in current year and selected month is beyond current month,
    // automatically set it to current month
    if (
      Number(selectedYear) === currentYear &&
      Number(selectedMonth) > currentMonth - 1
    ) {
      setSelectedMonth((currentMonth - 1).toString());
      return; // Return early to prevent double fetch
    }

    async function getWeather() {
      const data = await fetchHistoricalDataAction(
        selectedLocation as LocationType,
        Number(selectedYear),
        Number(selectedMonth)
      );
      if (data) {
        setWeatherDataObject(data);
      }
    }

    getWeather();
  }, [
    selectedLocation,
    selectedMonth,
    selectedYear,
    currentMonth,
    currentYear,
  ]);

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-accent/20 via-primary/20 to-accent/20">
        <div className="flex flex-col items-center w-full px-4 py-12">
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
              <Select
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger className="w-full backdrop-blur-sm bg-white/80 border-white/20 text-gray-800 font-medium">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-md border-white/20">
                  {locations.map((location) => (
                    <SelectItem
                      key={location.id}
                      value={location.id}
                      className="text-gray-800 hover:bg-accent/20 focus:bg-accent/20"
                    >
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-full backdrop-blur-sm bg-white/80 border-white/20 text-gray-800 font-medium">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-md border-white/20">
                  {years.map((year, index) => (
                    <SelectItem
                      key={index}
                      value={year.toString()}
                      className="text-gray-800 hover:bg-accent/20 focus:bg-accent/20"
                    >
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-full backdrop-blur-sm bg-white/80 border-white/20 text-gray-800 font-medium">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-md border-white/20">
                  {months.map((month, index) => {
                    if (
                      Number(selectedYear) === currentYear &&
                      index > currentMonth - 1
                    )
                      return null;
                    return (
                      <SelectItem
                        key={index}
                        value={index.toString()}
                        className="text-gray-800 hover:bg-accent/20 focus:bg-accent/20"
                      >
                        {month}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="responsive-grid max-w-7xl mx-auto gap-4">
              {weekdays.map((day) => (
                <div key={day} className="hide1200 w-full text-center text-xl">
                  {day}
                </div>
              ))}
              {!weatherDataObject ? (
                <HistoricalSkeleton />
              ) : (
                weatherDataObject?.historicalData.map((date) => {
                  return (
                    <div
                      key={date.time}
                      className={`h-[10.5rem] w-[10rem] p-4 rounded-lg border-2 border-neutral-800  ${
                        new Date(date.time).getMonth().toString() ===
                        selectedMonth
                          ? "bg-slate-100"
                          : "bg-slate-100 border-opacity-30"
                      } `}
                    >
                      <div
                        className={`flex items-center justify-between ${
                          new Date(date.time).getMonth().toString() ===
                          selectedMonth
                            ? ""
                            : "opacity-30"
                        }`}
                      >
                        <span className="text-lg font-medium">
                          {convertDateFormat(date.time)}
                        </span>
                        {/* <Image
                          src={`/weather-icons/${
                            getWeatherCode(Number(date.weatherCode))?.icon_day
                          }`}
                          alt={
                            getWeatherCode(Number(date.weatherCode))
                              ?.description || "Weather icon"
                          }
                          width={50}
                          height={50}
                          priority={true}
                        /> */}
                      </div>
                      <div
                        className={`flex flex-col flex-1 mt-2 ${
                          new Date(date.time).getMonth().toString() ===
                          selectedMonth
                            ? ""
                            : "opacity-30"
                        }`}
                      >
                        <span className="text-2xl font-bold">
                          {date.temperatureMax}&deg;C
                        </span>
                        <p className="flex-1 text-xs mt-2">
                          {/* {
                            getWeatherCode(Number(date.weatherCode))
                              ?.description
                          } */}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forecast;
