
"use client"
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Wand2, Loader2 } from "lucide-react";
import { useState } from "react";
import { generateImage } from "@/ai/flows/image-generation-flow";
import { useToast } from "@/hooks/use-toast";


interface TourGalleryProps {
    images: string[];
    imageHints: string[];
    title: string;
}

export function TourGallery({ images, imageHints, title }: TourGalleryProps) {
    const [currentImages, setCurrentImages] = useState(images);
    const [isLoading, setIsLoading] = useState<number | null>(null);
    const { toast } = useToast();

    const handleGenerateImage = async (index: number) => {
        setIsLoading(index);
        const prompt = imageHints[index] || title;
        try {
            const result = await generateImage({ prompt });
            const newImages = [...currentImages];
            newImages[index] = result.imageUrl;
            setCurrentImages(newImages);
        } catch (error) {
            console.error("Failed to generate image:", error);
            toast({
                title: "Error",
                description: "Could not generate image. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(null);
        }
    }


    return (
        <Carousel className="w-full rounded-lg overflow-hidden shadow-lg border">
            <CarouselContent>
                {currentImages.map((src, index) => (
                    <CarouselItem key={index}>
                        <div className="aspect-w-16 aspect-h-9 bg-muted relative">
                            <Image
                                src={src}
                                alt={`${title} - view ${index + 1}`}
                                data-ai-hint={imageHints[index]}
                                width={1200}
                                height={675}
                                className="w-full h-[300px] md:h-[500px] object-cover"
                                priority={index === 0}
                            />
                             <Button 
                                className="absolute bottom-4 right-4" 
                                onClick={() => handleGenerateImage(index)}
                                disabled={isLoading !== null}
                            >
                                {isLoading === index ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Wand2 className="mr-2 h-4 w-4" />
                                )}
                                Auto-generate Image
                            </Button>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
        </Carousel>
    )
}
