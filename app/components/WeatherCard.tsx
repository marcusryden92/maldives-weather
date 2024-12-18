import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Sun, CloudRain, Cloud, CloudSun } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { HourlyWeather } from "./HourlyWeather";

interface WeatherCardProps {
  day: string;
  temperature: string;
  condition: string;
  icon: string;
  className?: string;
  index: number;
}

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case "sunny":
      return <Sun className="w-12 h-12 text-accent animate-pulse" />;
    case "partly cloudy":
      return <CloudSun className="w-12 h-12 text-accent" />;
    case "scattered showers":
      return <CloudRain className="w-12 h-12 text-accent" />;
    default:
      return <Cloud className="w-12 h-12 text-accent" />;
  }
};

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
  temperature,
  condition,
  className,
  index,
}: WeatherCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isToday = day.toLowerCase() === "today";
  const imageIndex = isToday ? 0 : (index % (backgroundImages.length - 1)) + 1;

  return (
    <>
      <Card
        className={cn(
          "p-8 border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-up overflow-hidden group relative text-white cursor-pointer",
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
        <div className="relative z-10 flex flex-col items-center space-y-6">
          <span className="text-lg font-medium">{day}</span>
          <div className="rounded-full p-4 bg-white/20 group-hover:scale-110 transition-transform duration-300">
            {getWeatherIcon(condition)}
          </div>
          <span className="text-4xl font-bold">{temperature}</span>
          <span className="text-lg text-white/90">{condition}</span>
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {day}'s Hourly Forecast
            </DialogTitle>
          </DialogHeader>
          <HourlyWeather
            day={day}
            backgroundImage={backgroundImages[imageIndex]}
            condition={condition}
            temperature={temperature}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
