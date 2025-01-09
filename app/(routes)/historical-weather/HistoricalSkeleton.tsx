import React from "react";

export default function HistoricalSkeleton() {
  const items = [];

  // Using a for loop to generate 30 items
  for (let i = 0; i < 30; i++) {
    items.push(
      <div
        key={i}
        className="bg-slate-50 rounded-lg h-[10.5rem] w-[10rem] bg-gradient-to-br from-slate-100 to-slate-300 animate-pulse"
      ></div>
    );
  }
  return <>{items}</>;
}
