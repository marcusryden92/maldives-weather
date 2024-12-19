"use client";

import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Image from "next/image";

const visitorData = [
  { month: "Jan", visitors: 15000 },
  { month: "Feb", visitors: 18000 },
  { month: "Mar", visitors: 16000 },
  { month: "Apr", visitors: 21000 },
  { month: "May", visitors: 19000 },
  { month: "Jun", visitors: 25000 },
];

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
            layout="intrinsic"
            width={1200} // Provide the actual width of your image
            height={800} // Provide the actual height of your image
            objectFit="cover"
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

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="p-6 text-center">
            <h3 className="text-3xl font-bold text-accent mb-2">98%</h3>
            <p className="text-muted-foreground">Forecast Accuracy</p>
          </Card>
          <Card className="p-6 text-center">
            <h3 className="text-3xl font-bold text-accent mb-2">1.2M+</h3>
            <p className="text-muted-foreground">Monthly Users</p>
          </Card>
          <Card className="p-6 text-center">
            <h3 className="text-3xl font-bold text-accent mb-2">200+</h3>
            <p className="text-muted-foreground">Weather Stations</p>
          </Card>
        </div>

        {/* Graph Section */}
        <Card className="p-6 mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Monthly Visitor Statistics
          </h2>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={visitorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visitors" fill="#9b87f5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

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
