"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getPersonalizedTourRecommendations } from "@/ai/flows/tour-recommendation";
import { Loader2, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const recommendationsSchema = z.object({
  userPreferences: z.string().min(10, "Please describe your preferences in more detail."),
  browsingHistory: z.string().min(10, "Please describe your browsing history in more detail."),
});

export function PersonalizedRecommendations() {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof recommendationsSchema>>({
    resolver: zodResolver(recommendationsSchema),
    defaultValues: {
      userPreferences: "Loves historical sites, prefers budget-friendly travel, and enjoys walking tours.",
      browsingHistory: "Viewed tours in Rome, Athens, and Egypt. Searched for 'ancient civilizations'.",
    },
  });

  async function onSubmit(values: z.infer<typeof recommendationsSchema>) {
    setIsLoading(true);
    setRecommendations([]);
    try {
      const result = await getPersonalizedTourRecommendations(values);
      setRecommendations(result.recommendedTours);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to get recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="recommendations" className="py-16 md:py-24 bg-secondary/50">
      <div className="container max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="md:pl-8">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Tours Tailored for You</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl">
              Our AI-powered recommendation engine helps you discover tours that match your unique interests. Just tell us what you like, and we'll find the perfect adventures for you.
            </p>
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="font-headline">Find Your Match</CardTitle>
                <CardDescription>Enter your preferences and browsing history to get started.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="userPreferences"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Preferences</FormLabel>
                          <FormControl>
                            <Textarea placeholder="e.g., 'I love hiking and nature...'" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="browsingHistory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Browsing History</FormLabel>
                          <FormControl>
                            <Textarea placeholder="e.g., 'Viewed tours in Switzerland, looked at mountain treks...'" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isLoading} className="w-full">
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Wand2 className="mr-2 h-4 w-4" />
                      )}
                      Get Recommendations
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          <div className="md:pr-8">
            <div className="bg-card p-8 rounded-lg min-h-[400px] flex items-center justify-center border shadow-inner">
              {isLoading ? (
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              ) : recommendations.length > 0 ? (
                <div className="space-y-4 w-full">
                  <h3 className="font-bold text-xl font-headline">Recommended For You:</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {recommendations.map((tour, index) => (
                      <li key={index} className="text-lg">{tour}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <Wand2 className="mx-auto h-12 w-12 mb-4" />
                  <p>Your personalized tour recommendations will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
