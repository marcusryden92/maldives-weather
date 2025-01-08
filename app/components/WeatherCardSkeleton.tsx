import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface WeatherCardSkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export const WeatherCardSkeleton = ({
  className,
  style,
}: WeatherCardSkeletonProps) => {
  return (
    <Card
      className={cn(
        "bg-slate-200 p-8 border-none shadow-lg overflow-hidden relative bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse",
        className
      )}
      style={style}
    >
      <div className="flex flex-col items-center space-y-6">
        {/* Day text skeleton */}
        <div className="h-6 w-20 bg-slate-300 rounded-md" />

        {/* Weather icon skeleton */}
        <div className="rounded-full p-4 bg-slate-300 w-24 h-24" />

        {/* Temperature skeleton */}
        <div className="h-10 w-32 bg-slate-300 rounded-md" />

        {/* Description skeleton */}
        <div className="h-6 w-40 bg-slate-300 rounded-md" />
      </div>
    </Card>
  );
};

interface WeatherCardSkeletonListProps {
  count?: number;
}

export const WeatherCardSkeletonList = ({
  count = 5,
}: WeatherCardSkeletonListProps) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
      {Array.from({ length: count }).map((_, index) => (
        <WeatherCardSkeleton
          key={index}
          className="animate-fade-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        />
      ))}
    </div>
  );
};
