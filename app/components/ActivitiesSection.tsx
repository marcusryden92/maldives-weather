import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Image from "next/image";

import Link from "next/link";

const activities = [
  {
    id: 1,
    title: "Addu Atholhu",
    description:
      "Addu Atholhu is a beautiful jewel tucked in the Maldives' southern embrace.",
    image: "/booking/addu.png.webp",
    link: "https://maldivescamping.com/addu-atholhu-seenu-atoll/",
  },
  {
    id: 2,
    title: "Male Atholhu",
    description: "Malé, the heart of the Maldives.",
    image: "/booking/male.png.webp",
    link: "https://maldivescamping.com/male-atholhu-kaafu-atoll/",
  },
  {
    id: 3,
    title: "Miladhunmadulu Dhekunuburi",
    description:
      "Exemplifies the harmonious coexistence of nature and community. ",
    image: "/booking/noonu.webp",
    link: "https://maldivescamping.com/miladhunmadulu-dhekunuburi-noonu-atoll/",
  },
];

export const ActivitiesSection = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="text-center space-y-4">
        <span className="text-sm font-medium text-accent bg-accent/10 px-4 py-1 rounded-full">
          Experiences
        </span>
        <h2 className="text-3xl font-semibold text-accent drop-shadow-md">
          Unforgettable Activities
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover extraordinary experiences that will make your Maldives
          vacation truly memorable
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <Card
            key={activity.id}
            className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-accent"
          >
            <div className="flex aspect-video relative overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  layout="fill" // This will make the image fill the parent container
                  objectFit="cover" // Ensures the aspect ratio is maintained while filling the frame
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{activity.title}</CardTitle>
              <CardDescription>{activity.description}</CardDescription>
            </CardHeader>
            <div className="flex flex-1 justify-between items-end p-6 pt-0">
              {/* <span className="font-semibold text-accent">
                {activity.price}
              </span> */}
              <div className="flex flex-1 items-end  ">
                <Link href={activity.link}>
                  <Button variant="outline">Book Tour</Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
