
"use client";

import { useEffect, useState } from "react";
import { TourCard } from "@/components/tour-card";
import { tours, Tour } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Briefcase, Settings, Loader2 } from "lucide-react";
import { getBookingsByEmail, Booking } from "@/services/booking-service";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import type { Timestamp } from "firebase/firestore";

export default function DashboardPage() {
  const { user, loading, userProfile } = useAuth();
  const router = useRouter();
  const [wishlistTours, setWishlistTours] = useState<Tour[]>([]);
  const [bookedTours, setBookedTours] = useState<Booking[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    try {
      const wishlistIds = JSON.parse(localStorage.getItem("wishlist") || "[]");
      const filteredWishlist = tours.filter(tour => wishlistIds.includes(tour.id));
      setWishlistTours(filteredWishlist);
    } catch (error) {
      console.error("Failed to load wishlist from localStorage", error);
    }
  }, []);

  useEffect(() => {
    async function fetchBookings() {
      if (!user?.email) return;
      setIsLoadingBookings(true);
      try {
        const bookings = await getBookingsByEmail(user.email);
        setBookedTours(bookings);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      } finally {
        setIsLoadingBookings(false);
      }
    }
    fetchBookings();
  }, [user]);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-14rem)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }
  
  const getBookingDate = (date: Timestamp | Date | undefined): string => {
    if (!date) {
      return 'N/A';
    }
  
    // Check if it's a Firestore Timestamp and convert it
    if (typeof (date as Timestamp).toDate === 'function') {
      return (date as Timestamp).toDate().toLocaleDateString();
    }
  
    // Check if it's already a Date object
    if (date instanceof Date) {
      return date.toLocaleDateString();
    }
    
    // Attempt to parse if it's a string or number (less likely for Firestore)
    try {
      const parsedDate = new Date(date as any);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.toLocaleDateString();
      }
    } catch (e) {
      // Ignore parsing errors
    }
  
    return 'Invalid Date';
  }


  return (
    <div className="container max-w-7xl py-8 md:py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.photoURL || "https://placehold.co/100x100.png"} data-ai-hint="profile picture" alt="@user" />
          <AvatarFallback>{userProfile?.firstName?.[0] || 'U'}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold font-headline">Welcome Back, {userProfile?.firstName || user.email}</h1>
          <p className="text-muted-foreground">Here's your travel hub. Manage your profile, view your adventures, and dream up new ones.</p>
        </div>
      </div>

      <Tabs defaultValue="wishlist" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
          <TabsTrigger value="wishlist"><Heart className="mr-2 h-4 w-4" />Wishlist</TabsTrigger>
          <TabsTrigger value="bookings"><Briefcase className="mr-2 h-4 w-4" />Bookings</TabsTrigger>
          <TabsTrigger value="profile"><Settings className="mr-2 h-4 w-4" />Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="wishlist" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Your Wishlist</CardTitle>
              <CardDescription>The adventures you're dreaming of. Click on a tour to see details and book.</CardDescription>
            </CardHeader>
            <CardContent>
              {wishlistTours.length > 0 ? (
                <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
                  {wishlistTours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Heart className="mx-auto h-12 w-12 mb-4" />
                  <p>Your wishlist is empty.</p>
                  <p>Start exploring to find tours you love!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bookings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Your Bookings</CardTitle>
              <CardDescription>Your upcoming and past adventures.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingBookings ? (
                 <div className="flex justify-center py-12">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                 </div>
              ) : bookedTours.length > 0 ? (
                <div className="space-y-4">
                  {bookedTours.map(booking => (
                     booking.tour && (
                        <div key={booking.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg gap-4">
                            <div className="flex-grow">
                                <h3 className="font-semibold">{booking.tour.title}</h3>
                                <p className="text-sm text-muted-foreground">Status: Confirmed | Booked on: {getBookingDate(booking.bookingDate)}</p>
                            </div>
                            <Button variant="outline" asChild>
                                <a href={`/tours/${booking.tourId}`}>View Details</a>
                            </Button>
                        </div>
                     )
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Briefcase className="mx-auto h-12 w-12 mb-4" />
                  <p>You have no bookings yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Profile Settings</CardTitle>
              <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={`${userProfile?.firstName || ''} ${userProfile?.lastName || ''}`} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={user.email || ''} readOnly />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
