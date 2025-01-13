"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { HourlyWeather } from "./HourlyWeather";

import { HourlyWeatherData } from "@/lib/weatherData";

import { getWeatherCode } from "@/utils/weatherHelpers";

import { convertDateFormat } from "@/utils/formatting";

interface WeatherCardProps {
  day: string;
  time: string;
  temperature: number;
  weatherCode: number;
  className?: string;
  index: number;
  hourlyData: HourlyWeatherData[];
  mainCard?: boolean;
}

const backgroundImages = [
  "/lovable-uploads/9dc13eb9-785c-45ba-a036-a3bcb96e4bf8.png",
  "/lovable-uploads/bf50f110-02fd-4b05-bb49-2b502489c51c.png",
  "/lovable-uploads/bd82af9e-512c-48bb-8026-88c52b1a7efd.png",
  "/lovable-uploads/ef22733b-3bb3-48c0-b62e-eec4023cdbbc.png",
  "/lovable-uploads/cffc9971-9a50-40ed-8955-c4e4243fce4e.png",
  "/lovable-uploads/1b0338be-72df-4827-acd1-367da387ea25.png",
  "/lovable-uploads/ca97d0a7-3347-4649-a7f3-db9d0ba1fe62.png",
  "/lovable-uploads/03ba4976-a3ea-4414-b126-f4ec5e1f4b81.png",
  "/lovable-uploads/741e24fe-e665-4e68-90fd-f197a4b36577.png",
  "/lovable-uploads/d958e7d2-d44c-4560-9ae3-79cba767b336.png",
];

export const WeatherCard = ({
  day,
  time,
  temperature,
  weatherCode,
  className,
  index,
  hourlyData,
  mainCard,
}: WeatherCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const imageIndex = (index % (backgroundImages.length - 1)) + 1;

  const [codeData] = useState(getWeatherCode(weatherCode)) || "";

  const date = convertDateFormat(time);

  return (
    <>
      <Card
        className={cn(
          "flex flex-col items-center justify-center w-full  h-auto  border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-up overflow-hidden group relative text-white cursor-pointer ",
          mainCard
            ? "aspect-auto p-8"
            : "aspect-square md:aspect-auto p-4 md:p-8",
          className
        )}
        style={{
          backgroundImage: `url('${backgroundImages[imageIndex]}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-all duration-300 group-hover:backdrop-blur-0 group-hover:bg-black/20" />
        <div
          className={`relative z-10 flex flex-col items-center ${
            mainCard ? "space-y-4 lg:space-y-6" : "md:space-y-6"
          } `}
        >
          <span
            className={`${
              mainCard ? "text-lg" : "text-[3vw] md:text-lg"
            } font-medium`}
          >
            {day} {date}
          </span>
          <div
            className={`flex flex-col items-center rounded-full ${
              mainCard ? "p-4" : "md:p-4"
            }  bg-whitobe/20 group-hover:scale-110 transition-transform duration-300`}
          >
            <img
              src={`/weather-icons/${codeData?.icon_day}`}
              alt={codeData?.description || "Weather icon"}
              className={`${mainCard ? "w-[80px]" : "w-[10vw] md:w-[60px]"}`}
              style={{ filter: "invert(1)" }} // Inverts color to white
            />
          </div>
          <span
            className={`font-bold ${
              mainCard ? "text-4xl" : "text-[5vw] md:text-4xl "
            }`}
          >
            {temperature}&deg;C
          </span>
          <span
            className={`text-white text-center ${
              mainCard ? "text-2xl" : "text-[3vw] md:text-xl "
            }`}
          >
            {codeData?.description}
          </span>
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {day}&apos;s Hourly Forecast
            </DialogTitle>
          </DialogHeader>
          <HourlyWeather
            day={day}
            backgroundImage={backgroundImages[imageIndex]}
            hourlyData={hourlyData}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
