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
      return <Droplets className="w-[2vw] h-[2vw] text-accent" />;
    case "wind speed":
      return <Wind className="w-[2vw] h-[2vw] text-accent" />;
    case "uv index":
      return <Sun className="w-[2vw] h-[2vw] text-accent" />;
    default:
      return <Sun className="w-[2vw] h-[2vw] text-accent" />;
  }
};

export const WeatherMetrics = ({ metrics }: { metrics: MetricProps[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full animate-fade-up">
      {metrics.map((metric, index) => (
        <Card
          key={index}
          className="p-6 bg-white/80 border-none shadow-md hover:shadow-xl transition-all duration-300 flex items-center space-x-4"
        >
          <div className="w-[3vw] h-[3vw] rounded-full bg-primary/50 flex items-center justify-center">
            {getMetricIcon(metric.label)}
          </div>
          <div>
            <p className="text-[1vw] text-muted-foreground">{metric.label}</p>
            <p className="text-[1.5vw] font-semibold text-accent">
              {metric.value}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};
