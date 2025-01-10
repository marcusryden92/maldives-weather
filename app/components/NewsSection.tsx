"use client";

import { useEffect, useState } from "react";
import { fetchNews } from "@/api/fetchNews";
import { transformToUrlFriendly } from "@/utils/formatting";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface NewsSectionProps {
  limit?: number;
  showViewAll?: boolean;
}

// Define types for the response data
interface NewsItem {
  // Example fields, modify according to your actual data structure
  uuid: string;
  title: string;
  description: string;
  image_url: string;
  snippet: string;
  url: string;
  published_at: string | Date;
  source: string;
}

export const NewsSection = ({
  limit,
  showViewAll = true,
}: NewsSectionProps) => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [displayedNews, setDisplayedNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    if (newsData) {
      setDisplayedNews(limit ? newsData.slice(0, limit) : newsData);
    }
  }, [newsData]);

  useEffect(() => {
    async function fetchAndSetNews() {
      const data = await getNews();
      setNewsData(data); // Set the 'data' part of the response directly
    }

    fetchAndSetNews();
  }, []); // Empty array means this effect runs only once, when the component mounts

  async function getNews(): Promise<NewsItem[]> {
    const response = await fetchNews();

    if (response && response.data) {
      return response.data; // Extract and return the 'data' part of the response
    }

    return []; // Return an empty array if no data is available
  }

  return !displayedNews || displayedNews.length === 0 ? (
    <div className="text-2xl text-accent w-full text-center">Loading...</div>
  ) : (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold text-accent drop-shadow-md">
          Latest News
        </h2>
        {showViewAll && (
          <Button variant="outline" asChild>
            <Link href="/news">View All News</Link>
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {displayedNews.map((news) => (
          <Link
            href={`/news/${news.uuid}/${transformToUrlFriendly(news.title)}`}
            key={news.uuid}
          >
            <Card
              className={`overflow-hidden transition-all duration-300 hover:shadow-lg `}
            >
              <div className="aspect-video relative overflow-hidden">
                <div className="relative w-full h-full">
                  <img
                    src={news.image_url}
                    alt={news.title}
                    style={{
                      objectFit: "cover",
                      width: "100%", // or set a fixed width if needed
                      height: "100%", // or set a fixed height if needed
                    }}
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{news.title}</CardTitle>
                <CardDescription className="text-base">
                  {news.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
