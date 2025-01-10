"use server";

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

interface NewsResponse {
  // Define the response type based on the API's actual response
  data: NewsItem[];
  meta: {
    found: number;
    returned: number;
    limit: number;
    page: number;
  };
}

export async function fetchNews(): Promise<NewsResponse> {
  const params = {
    api_token: process.env.NEWS_API as string,
    language: "en",
    search: "maldives",
    categories: "food,travel,entertainment,sports",
    limit: "3",
  };
  const baseUrl = "https://api.thenewsapi.com/v1/news/all";

  // Convert params object to URL search params
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) queryParams.append(key, value);
  });

  try {
    const response = await fetch(`${baseUrl}?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: NewsResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
}
