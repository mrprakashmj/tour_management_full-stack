import { tours } from "@/lib/mock-data";
import { TourCard } from "@/components/tour-card";
import { SearchAndFilter } from "@/components/search-filter";
import { PersonalizedRecommendations } from "@/components/personalized-recommendations";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] md:h-[80vh] w-full">
        <Image
          src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxiaXJkc2V5ZSUyMHZpZXclMjBvZiUyMGElMjBsYWtlJTIwaW4lMjB0aGUlMjBtb3VudGFpbnN8ZW58MHx8fHwxNzUzODg4MDExfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Breathtaking landscape"
          data-ai-hint="breathtaking landscape"
          fill
          objectFit="cover"
          className="brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline leading-tight animate-fade-in-down">
            Unforgettable Journeys Await
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl font-body animate-fade-in-up">
            Explore the world with our curated tours. From serene landscapes to bustling cities, your next adventure is just a click away.
          </p>
          <Button size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold" asChild>
            <Link href="/#tours">Explore Tours</Link>
          </Button>
        </div>
      </section>

      <section id="tours" className="py-16 md:py-24 bg-background">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Find Your Perfect Tour</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Search for your dream destination, select your dates, and let us handle the rest. Adventure is calling!
            </p>
          </div>
          <SearchAndFilter />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>
      
      <PersonalizedRecommendations />

    </div>
  );
}
