"use client";

import Header from "@/components/Header";

import Image from "next/image";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero Section */}
        <div className="relative h-[400px] rounded-lg overflow-hidden mb-12">
          <Image
            src="/lovable-uploads/cbd5b28b-9ef1-4c05-8503-3c3432b41ccd.png"
            alt="Maldives Beach"
            fill
            style={{ objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              Your Trusted Weather Guide in Paradise
            </h1>
          </div>
        </div>

        {/* About Text */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Since 2020, Maldives Weather has been the premier destination for
            accurate, reliable weather forecasting in the Maldives. Our
            dedication to precision and local expertise makes us the most
            trusted weather service for tourists, locals, and businesses across
            the archipelago.
          </p>
          <p className="text-lg text-muted-foreground">
            We combine cutting-edge meteorological technology with deep local
            knowledge to provide you with the most accurate weather predictions,
            helping you plan your perfect Maldivian experience.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground">
            To provide the most accurate and reliable weather information for
            the Maldives, empowering travelers and locals to make informed
            decisions and enjoy paradise to its fullest potential.
          </p>
        </div>
      </main>
    </div>
  );
};

export default About;
