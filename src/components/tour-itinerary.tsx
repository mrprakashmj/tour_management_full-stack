import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import type { ItineraryItem } from "@/lib/mock-data"

interface TourItineraryProps {
    itinerary: ItineraryItem[];
}

export function TourItinerary({ itinerary }: TourItineraryProps) {
    return (
        <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
            {itinerary.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline text-left">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground font-bold text-sm flex-shrink-0">
                                {item.day}
                            </div>
                            <span className="font-headline">{item.title}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-16 pb-4 text-base text-muted-foreground">
                        {item.description}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
