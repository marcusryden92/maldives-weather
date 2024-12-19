// import { WeatherCard } from "@/components/WeatherCard";
import { WeatherMetrics } from "@/components/WeatherMetrics";
import Header from "@/components/Header";

/* const weatherData = {
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
  ],
}; */

const metrics = [
  { label: "Humidity", value: "75%", icon: "droplets" },
  { label: "Wind Speed", value: "12 km/h", icon: "wind" },
  { label: "UV Index", value: "High", icon: "sun" },
];

const Forecast = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-accent/20 via-primary/20 to-accent/20">
        <div className="w-full px-4 py-12">
          <div className="space-y-12 pt-16">
            {/* Header Section */}
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent drop-shadow-lg animate-fade-up">
                Weather Forecast
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
                Detailed weather information for the upcoming week
              </p>
            </div>

            {/* Weather Metrics */}
            <div className="max-w-6xl mx-auto px-4">
              <WeatherMetrics metrics={metrics} />
            </div>

            {/* Weather Forecast */}
            <div className="space-y-8 px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {/*  {weatherData.forecast.map((day, index) => (
                  <WeatherCard
                    key={index}
                    day={day.day}
                    temperature={day.temperature}
                    condition={day.condition}
                    icon={day.icon}
                    className="transform hover:scale-105 transition-all duration-300"
                    index={index}
                  />
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forecast;
