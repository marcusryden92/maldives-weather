import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const activities = [
  {
    id: 1,
    title: "Parasailing Adventure",
    description: "Soar high above the turquoise waters for breathtaking views",
    price: "From $89",
    image: "/lovable-uploads/d2fe40f5-f148-4c54-a616-8aaea06360c3.png"
  },
  {
    id: 2,
    title: "Stand-Up Paddleboarding",
    description: "Explore crystal clear lagoons at your own pace",
    price: "From $45",
    image: "/lovable-uploads/4c5fada6-4487-4206-bebe-e154f422a683.png"
  },
  {
    id: 3,
    title: "Snorkeling Adventure",
    description: "Discover vibrant coral reefs and marine life",
    price: "From $65",
    image: "/lovable-uploads/bf7f1589-7df3-4a31-8628-3a4249437e88.png"
  },
  {
    id: 4,
    title: "Jet Ski Experience",
    description: "Feel the thrill of riding the waves",
    price: "From $120",
    image: "/lovable-uploads/2555de1a-345b-4203-ba61-1938d05ebdea.png"
  }
];

export const ActivitiesSection = () => {
  return (
    <div className="space-y-8 px-4 max-w-7xl mx-auto">
      <div className="text-center space-y-4">
        <span className="text-sm font-medium text-accent bg-accent/10 px-4 py-1 rounded-full">
          Experiences
        </span>
        <h2 className="text-3xl font-semibold text-accent drop-shadow-md">
          Unforgettable Activities
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover extraordinary experiences that will make your Maldives vacation truly memorable
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activities.map((activity) => (
          <Card 
            key={activity.id}
            className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-accent"
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={activity.image}
                alt={activity.title}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{activity.title}</CardTitle>
              <CardDescription>{activity.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <span className="font-semibold text-accent">{activity.price}</span>
              <Button variant="outline">Book Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};