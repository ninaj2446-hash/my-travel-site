import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Experiences from "@/components/Experiences";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Discover curated destinations, hidden gems, and editorial travel experiences worldwide.",
};

export default function DestinationsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Destinations"
        title="A world canvas, painted for you alone"
        subtitle="Editorial journeys across continents—each destination filtered through your taste, timing, and temperament."
      />
      <Experiences />
    </main>
  );
}
