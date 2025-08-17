import type { Tour } from "@/lib/mock-data";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <Card className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <CardHeader className="p-0 relative">
        <Link href={`/tours/${tour.id}`} aria-label={tour.title}>
          <Image
            src={tour.images[0]}
            alt={tour.title}
            data-ai-hint={tour.imageHints[0]}
            width={400}
            height={300}
            className="w-full h-56 object-cover"
          />
        </Link>
        <Button size="icon" variant="secondary" className="absolute top-4 right-4 rounded-full h-9 w-9 bg-white/80 hover:bg-white/100" aria-label="Add to wishlist">
          <Heart className="h-5 w-5 text-red-500/80" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Badge variant="outline" className="mb-2">{tour.destination}</Badge>
        <CardTitle className="text-xl font-headline leading-tight">
          <Link href={`/tours/${tour.id}`}>{tour.title}</Link>
        </CardTitle>
        <p className="text-muted-foreground mt-2 text-sm line-clamp-3">{tour.description}</p>
      </CardContent>
      <CardFooter className="p-4 flex flex-col items-start gap-3">
        <div className="flex justify-between w-full items-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{tour.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-accent fill-accent" />
              <span className="font-bold">{tour.rating}</span>
              <span className="text-sm text-muted-foreground">({tour.reviews})</span>
            </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <p className="text-2xl font-bold text-primary">₹{tour.price.toLocaleString('en-IN')}</p>
          <Button asChild>
            <Link href={`/tours/${tour.id}`}>View Details</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
