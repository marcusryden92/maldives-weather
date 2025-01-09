import React from "react";

export default function HistoricalSkeleton() {
  const items = [];

  // Using a for loop to generate 30 items
  for (let i = 0; i < 30; i++) {
    items.push(
      <div
        key={i}
        className="bg-accent/20 rounded-lg h-[10.5rem] w-[10rem] "
      ></div>
    );
  }
  return <>{items}</>;
}
