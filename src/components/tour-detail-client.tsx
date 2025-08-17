
"use client";

import type { Tour } from "@/lib/mock-data";
import { useState } from "react";
import { Star, Calendar, IndianRupee, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TourItinerary } from "@/components/tour-itinerary";
import { TourGallery } from "@/components/tour-gallery";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { BookingForm } from "@/components/booking-form";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export function TourDetailClient({ tour }: { tour: Tour }) {
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);

  const handleAddToWishlist = () => {
    try {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      if (!wishlist.includes(tour.id)) {
        wishlist.push(tour.id);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        toast({
          title: "Success!",
          description: `"${tour.title}" has been added to your wishlist.`,
        });
      } else {
        toast({
          title: "Already in Wishlist",
          description: `"${tour.title}" is already in your wishlist.`,
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      toast({
        title: "Error",
        description: "Could not add to wishlist. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleBookingSuccess = () => {
    toast({
        title: "Redirecting...",
        description: "Taking you to your dashboard to see your new booking.",
    });
    router.push('/dashboard?tab=bookings');
  };

  const handleBookNowClick = () => {
    if (user) {
        setIsBookingFormOpen(true);
    } else {
        toast({
            title: "Please Log In",
            description: "You need to be logged in to book a tour.",
            variant: "destructive"
        });
        router.push('/login');
    }
  };

  return (
    <div className="bg-secondary/30">
      <div className="container max-w-7xl py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
          <div className="lg:col-span-2">
            <TourGallery images={tour.images} imageHints={tour.imageHints} title={tour.title} />
            <div className="mt-8">
              <Badge>{tour.destination}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold font-headline mt-2">{tour.title}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-accent fill-accent" />
                  <span className="font-bold text-foreground">{tour.rating}</span>
                  <span>({tour.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-5 h-5" />
                  <span>{tour.duration}</span>
                </div>
              </div>
              <p className="mt-6 text-lg text-foreground/80">{tour.longDescription}</p>
            </div>

            <div className="mt-12">
              <h2 className="text-3xl font-bold font-headline mb-4">Itinerary</h2>
              <TourItinerary itinerary={tour.itinerary} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-headline">Book Your Adventure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-muted-foreground">Price per person</span>
                  <p className="text-3xl font-bold text-primary">₹{tour.price.toLocaleString('en-IN')}</p>
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary"/>
                        <span className="font-semibold text-foreground">Group Size: 2-12 people</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <IndianRupee className="w-5 h-5 text-primary"/>
                        <span className="font-semibold text-foreground">Instant Confirmation</span>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <Button size="lg" className="w-full" onClick={handleBookNowClick}>Book Now</Button>
                    <Button size="lg" variant="outline" className="w-full" onClick={handleAddToWishlist}>
                        <Heart className="mr-2 h-5 w-5"/>
                        Add to Wishlist
                    </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <BookingForm
        tourId={tour.id}
        tourTitle={tour.title}
        open={isBookingFormOpen}
        onOpenChange={setIsBookingFormOpen}
        onBookingSuccess={handleBookingSuccess}
      />
    </div>
  );
}
