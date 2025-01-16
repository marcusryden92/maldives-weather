import { Card } from "@/components/ui/card";
import { Droplets, Wind, Sun } from "lucide-react";

interface MetricProps {
  label: string;
  value: string;
  icon: string;
}

const getMetricIcon = (label: string) => {
  switch (label.toLowerCase()) {
    case "humidity":
      return (
        <Droplets className="w-[5vw] h-[5vw] sm:w-[4vw] sm:h-[4vw] md:w-[2vw] md:h-[2vw] text-accent" />
      );
    case "wind speed":
      return (
        <Wind className="w-[5vw] h-[5vw] sm:w-[4vw] sm:h-[4vw] md:w-[2vw] md:h-[2vw] text-accent" />
      );
    case "uv index":
      return (
        <Sun className="w-[5vw] h-[5vw] sm:w-[4vw] sm:h-[4vw] md:w-[2vw] md:h-[2vw] text-accent" />
      );
    default:
      return (
        <Sun className="w-[5vw] h-[5vw] sm:w-[4vw] sm:h-[4vw] md:w-[2vw] md:h-[2vw] text-accent" />
      );
  }
};

export const WeatherMetrics = ({ metrics }: { metrics: MetricProps[] }) => {
  return (
    <div className="grid grid-cols-2 gap-6 w-full animate-fade-up">
      {metrics.map((metric, index) => (
        <Card
          key={index}
          className="p-6 bg-white/80 border-none shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-4"
        >
          <div className="w-[10vw] h-[10vw] md:w-[3vw] md:h-[3vw] rounded-full bg-primary/50 flex items-center justify-center">
            {getMetricIcon(metric.label)}
          </div>
          <div>
            <p className="md:text-[1vw] text-muted-foreground">
              {metric.label}
            </p>
            <p className="md:text-[1.5vw] font-semibold text-accent">
              {metric.value}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};
