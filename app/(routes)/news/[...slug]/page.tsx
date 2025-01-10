import React from "react";
import { fetchNewsByUUID } from "@/api/fetchNewsByUUID";

import Header from "@/components/Header";

import { Button } from "@/components/ui/button";
import Link from "next/link";

type Params = Promise<{ slug: string[] }>;

export default async function Article({ params }: { params: Params }) {
  const { slug } = await params; // Access slug directly
  const uuid = slug[0]; // Get the UUID from the slug

  // Fetch the article data by UUID
  const { data, error } = await fetchNewsByUUID(uuid);

  // Handle any errors that may occur during data fetching
  if (error) {
    return (
      <div className="text-center text-red-500">Error fetching article</div>
    );
  }

  if (!data) {
    return <div className="text-center text-gray-500">Article not found</div>;
  }

  // Destructure the article data for easier access
  const { title, description, snippet, url, image_url, published_at, source } =
    data;

  // Format the published date
  const formattedDate = new Date(published_at).toLocaleDateString();

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto p-6 mt-20">
        {/* Display article image */}
        {image_url && (
          <img
            src={image_url}
            alt={title}
            className="w-full h-auto mb-6 rounded-lg shadow-md"
          />
        )}

        {/* Display article title */}
        <h1 className="flex justify-between text-3xl font-semibold text-gray-900 mb-4">
          <span className="truncate">{title}</span>{" "}
          <Link href={url}>
            <Button variant={"outline"} className="text-xl">
              Read the full article
            </Button>
          </Link>
        </h1>

        {/* Display article description */}
        <p className="text-lg text-gray-700 mb-6">{description}</p>

        {/* Display article snippet */}
        <p className="text-base text-gray-600 mb-6">{snippet}</p>

        {/* Display the article source */}
        <div className="mb-6">
          <strong className="text-gray-800">Source:</strong>{" "}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 hover:text-neutral-800"
          >
            {source}
          </a>
        </div>

        {/* Display publication date */}
        <div className="flex flex-col w-full justify-between gap-8">
          <div>
            <strong className="text-gray-800">Published on:</strong>{" "}
            {formattedDate}
          </div>

          {/* Provide a link to the full article */}
        </div>
      </div>
    </>
  );
}
