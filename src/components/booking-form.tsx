
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { createBooking } from "@/services/booking-service";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
});

interface BookingFormProps {
  tourId: string;
  tourTitle: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBookingSuccess: () => void;
}

export function BookingForm({ tourId, tourTitle, open, onOpenChange, onBookingSuccess }: BookingFormProps) {
  const { toast } = useToast();
  const { user, userProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(bookingSchema),
  });
  
  useEffect(() => {
    if (user && userProfile) {
      setValue("name", `${userProfile.firstName} ${userProfile.lastName}`);
      setValue("email", user.email || "");
    }
  }, [user, userProfile, setValue]);

  const onSubmit = async (data: z.infer<typeof bookingSchema>) => {
    setIsLoading(true);
    try {
      await createBooking({ ...data, tourId });
      toast({
        title: "Booking Confirmed!",
        description: `You have successfully booked "${tourTitle}".`,
      });
      onBookingSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to book tour:", error);
      toast({
        title: "Error",
        description: "Could not complete booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book: {tourTitle}</DialogTitle>
          <DialogDescription>
            Please confirm your details to book your spot.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <div className="col-span-3">
              <Input id="name" {...register("name")} />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message as string}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <div className="col-span-3">
              <Input id="email" type="email" {...register("email")} />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm Booking
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
