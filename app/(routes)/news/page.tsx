import { NewsSection } from "@/components/NewsSection";
import Header from "@/components/Header";

const News = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-accent/20 via-primary/20 to-accent/20">
        <div className="container mx-auto px-4 py-24">
          <div className="space-y-6 text-center mb-12">
            <h1 className="text-5xl font-bold text-accent">Weather News</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest weather news and alerts from the
              Maldives
            </p>
          </div>
          <NewsSection showViewAll={false} />
        </div>
      </div>
    </>
  );
};

export default News;
