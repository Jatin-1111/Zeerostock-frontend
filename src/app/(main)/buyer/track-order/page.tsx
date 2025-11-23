"use client";

import TrackOrderForm from "@/components/track-order/TrackOrderForm";
import { useRouter } from "next/navigation";

export default function TrackOrderPage() {
  const router = useRouter();

  const handleTrack = (orderId: string) => {
    router.push(`/buyer/track-order/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <TrackOrderForm onTrack={handleTrack} />
    </div>
  );
}
