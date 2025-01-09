import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Resort {
  id: number;
  name: string;
  description: string;
  bestMonths: string[];
  price: string;
  image: string;
  rating: number;
  link: string;
}

interface ResortCardProps {
  resort: Resort;
  currentMonth: string;
}

const ResortCard: React.FC<ResortCardProps> = ({ resort, currentMonth }) => {
  const { name, description, bestMonths, price, image, rating, link } = resort;

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-accent group">
      <div className="aspect-video relative overflow-hidden">
        <div className="relative w-full h-full group">
          <Image
            src={image}
            alt={name}
            layout="fill"
            className="transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-accent font-semibold">★ {rating}</span>
        </div>
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{name}</CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
          </div>
          <span className="font-semibold text-accent whitespace-nowrap">
            {price}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 space-y-4 justify-end">
        <div className="flex flex-wrap gap-2">
          {bestMonths.map((month) => (
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
        <Link href={link} className="mt-4">
          <Button variant="outline" className="w-full bg-sky-50">
            Book Now
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ResortCard;
