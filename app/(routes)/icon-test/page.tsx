"use client";

import React from "react";

import Image from "next/image";

import weatherIcons from "@/lib/weather-icons";

export default function page() {
  return (
    <div className="w-[100vw] h-[100vh] p-20">
      <div className="grid grid-cols-5 grid-rows-20 gap-10 ">
        {weatherIcons.map((code) => (
          <div
            key={code.description}
            className="flex flex-col rounded-xl items-center justify-center border-2 border-black p-8 gap-5"
          >
            <span className="text-lg text-center">{`${code.code}: ${code.description}`}</span>
            <div className="flex gap-5">
              <Image
                src={`/weather-icons/${code?.icon_day}`}
                alt={code?.description || "Weather icon"}
                width={60}
                height={60}
                priority={true}
              />
              <Image
                src={`/weather-icons/${code?.icon_night}`}
                alt={code?.description || "Weather icon"}
                width={60}
                height={60}
                priority={true}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
