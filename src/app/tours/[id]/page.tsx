import { tours } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { TourDetailClient } from "@/components/tour-detail-client";

export default function TourDetailPage({ params }: { params: { id: string } }) {
  const tour = tours.find((t) => t.id === params.id);

  if (!tour) {
    notFound();
  }

  return <TourDetailClient tour={tour} />;
}
