"use server";

interface NewsByUUIDResponse {
  // Define the response type based on the API's actual response
  data: any; // You can refine this based on the actual data structure
  error: string | null;
}

export async function fetchNewsByUUID(
  uuid: string
): Promise<NewsByUUIDResponse> {
  const params = {
    api_token: process.env.NEWS_API as string, // Make sure your API token is set in environment variables
  };

  const baseUrl = `https://api.thenewsapi.com/v1/news/uuid/${uuid}`;

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

    const data: NewsByUUIDResponse = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching news by UUID:", error);
    throw error;
  }
}
