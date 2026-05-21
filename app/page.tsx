import type { Metadata } from "next";
import Hero from "@/components/Hero";
import HomeGallery from "@/components/HomeGallery";
import VideoAd from "@/components/VideoAd";
import HomePreview from "@/components/HomePreview";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Elite AI travel—curated itineraries, seamless bookings, and bespoke journeys.",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HomeGallery />
      <VideoAd variant="banner" />
      <HomePreview />
    </main>
  );
}
