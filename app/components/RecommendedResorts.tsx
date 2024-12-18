import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const resorts = [
  {
    id: 1,
    name: "Sunsiyam Resort",
    description:
      "Experience luxury overwater villas with stunning sunset views",
    bestMonths: ["January", "February", "March"],
    price: "From $850/night",
    image: "/lovable-uploads/bc91b83b-031c-49dc-bf12-dc893bfd081c.png",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Azure Paradise Resort",
    description: "Modern overwater villas with sustainable solar technology",
    bestMonths: ["April", "May", "June"],
    price: "From $920/night",
    image: "/lovable-uploads/2339b277-1956-4d89-ba8a-2dd6c45e373a.png",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Aqua Breeze Resort",
    description: "Unique water villas featuring private pools and water slides",
    bestMonths: ["July", "August", "September"],
    price: "From $780/night",
    image: "/lovable-uploads/d1212b1b-f773-4707-8262-f0f55528a0d4.png",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Island View Resort",
    description: "Panoramic ocean views with direct access to pristine beaches",
    bestMonths: ["October", "November", "December"],
    price: "From $890/night",
    image: "/lovable-uploads/c2893ed3-480e-4318-a6e8-b5dfd2c76f89.png",
    rating: 4.8,
  },
];

export const RecommendedResorts = () => {
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  return (
    <div className="space-y-8 px-4 py-12 max-w-7xl mx-auto">
      <div className="text-center space-y-4">
        <span className="text-sm font-medium text-accent bg-accent/10 px-4 py-1 rounded-full">
          Where to Stay
        </span>
        <h2 className="text-3xl font-semibold text-accent drop-shadow-md">
          Recommended Resorts
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover our carefully curated selection of luxury resorts, perfectly
          matched to each season's weather patterns
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {resorts.map((resort) => (
          <Card
            key={resort.id}
            className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-accent group"
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={resort.image}
                alt={resort.name}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-accent font-semibold">
                  ★ {resort.rating}
                </span>
              </div>
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{resort.name}</CardTitle>
                  <CardDescription className="mt-2">
                    {resort.description}
                  </CardDescription>
                </div>
                <span className="font-semibold text-accent whitespace-nowrap">
                  {resort.price}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {resort.bestMonths.map((month) => (
                  <span
                    key={month}
                    className={`text-xs px-3 py-1 rounded-full ${
                      month === currentMonth
                        ? "bg-accent text-white"
                        : "bg-accent/10 text-accent"
                    }`}
                  >
                    {month}
                  </span>
                ))}
              </div>
              <Button className="w-full">Book Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
