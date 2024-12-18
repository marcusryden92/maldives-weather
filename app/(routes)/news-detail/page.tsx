import { useParams } from "react-router-dom";
import { newsItems } from "@/components/NewsSection";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NewsDetail = () => {
  const { id } = useParams();
  const newsItem = newsItems.find((item) => item.id === Number(id));

  if (!newsItem) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-accent/20 via-primary/20 to-accent/20 p-8">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-accent">News not found</h1>
            <Button asChild className="mt-4">
              <Link to="/news">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to News
              </Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-accent/20 via-primary/20 to-accent/20">
        <div className="container mx-auto px-4 py-24">
          <Button variant="outline" asChild className="mb-8">
            <Link to="/news">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to News
            </Link>
          </Button>

          <article className="bg-card rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={newsItem.image}
                alt={newsItem.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-8">
              <h1 className="text-4xl font-bold mb-4 text-accent">
                {newsItem.title}
              </h1>
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-muted-foreground mb-6">
                  {newsItem.description}
                </p>
                <p className="text-lg">
                  {newsItem.type === "good"
                    ? "This favorable weather condition presents an excellent opportunity for visitors to enjoy various outdoor activities and make the most of their stay in the Maldives. Local businesses and tourism operators are optimistic about the positive impact this will have on the region's tourism industry."
                    : "Local authorities are closely monitoring the situation and have implemented necessary safety measures. Visitors are advised to stay informed about the latest updates and follow any guidelines or instructions provided by local authorities and resort management."}
                </p>
                <p className="text-lg mt-4">
                  {newsItem.type === "good"
                    ? "Weather experts predict these conditions will likely continue, providing ideal circumstances for both water activities and land-based experiences. Tourists are encouraged to take advantage of this perfect weather window for their planned activities."
                    : "Safety remains our top priority, and we will continue to provide updates as the situation develops. Travelers are recommended to maintain contact with their accommodation providers for the latest information and any potential changes to their planned activities."}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default NewsDetail;
