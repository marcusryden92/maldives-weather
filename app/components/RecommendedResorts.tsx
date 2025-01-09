import ResortCard from "./ResortCard";

const resorts = [
  {
    id: 1,
    name: "Sun Siyam Resorts",
    description:
      "Experience luxury overwater villas with stunning sunset views",
    bestMonths: ["January", "February", "March"],
    price: "From $850/night",
    image: "/lovable-uploads/bc91b83b-031c-49dc-bf12-dc893bfd081c.png",
    rating: 4.9,
    link: "https://www.sunsiyam.com/",
  },
  {
    id: 2,
    name: "Anantara Resort",
    description:
      "Escape to an island beach resort in the Maldives fringed by a turquoise lagoon",
    bestMonths: ["April", "May", "June"],
    price: "From $920/night",
    image: "/booking/anantara.webp",
    rating: 4.8,
    link: "https://www.anantara.com/en/veli-maldives",
  },
  {
    id: 3,
    name: "Aqua Breeze Resort",
    description: "Unique water villas featuring private pools and water slides",
    bestMonths: ["July", "August", "September"],
    price: "From $780/night",
    image: "/lovable-uploads/d1212b1b-f773-4707-8262-f0f55528a0d4.png",
    rating: 4.7,
    link: "https://breeze-resort-maldives.themaldiveshotels.com/en/",
  },
  {
    id: 4,
    name: "Island View Resort",
    description: "Panoramic ocean views with direct access to pristine beaches",
    bestMonths: ["October", "November", "December"],
    price: "From $890/night",
    image: "/lovable-uploads/c2893ed3-480e-4318-a6e8-b5dfd2c76f89.png",
    rating: 4.8,
    link: "https://gili-lankanfushi.com/maldives-luxury-resort/island-view-crusoe-residence/",
  },
];

export const RecommendedResorts = () => {
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  return (
    <div className="space-y-8 py-12 max-w-7xl mx-auto">
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
          <ResortCard
            key={resort.id}
            resort={resort}
            currentMonth={currentMonth}
          />
        ))}
      </div>
    </div>
  );
};
