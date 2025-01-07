"use client";

import React from "react";

import Image from "next/image";

import { icons } from "@/lib/all-icons";

export default function page() {
  return (
    <div className="w-[100vw] h-[100vh] p-20">
      <div className="grid grid-cols-5 grid-rows-20 gap-10 ">
        {icons.map((icon) => (
          <div
            key={icon.name}
            className="flex flex-col rounded-xl items-center justify-center border-2 border-black p-8 gap-5"
          >
            <span className="text-lg text-center">{`${icon.name}`}</span>
            <div className="flex gap-5">
              <Image
                src={`/weather-icons/${icon?.filename}`}
                alt={icon?.name || "Weather icon"}
                width={60}
                height={60}
                priority={true}
              />
            </div>
            <span className=" text-center">{`${icon.filename}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
