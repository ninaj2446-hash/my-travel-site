import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import TravelGenerator from "@/components/travel/TravelGenerator";

export const metadata: Metadata = {
  title: "Travel Generator",
  description:
    "AI travel generator with curated flights, hotels, and luxury budgets.",
};

export default function GeneratorPage() {
  return (
    <main>
      <PageHero
        eyebrow="AI Travel Generator"
        title="Real flights. Real hotels. One plan."
        subtitle="Voyanté Intelligence composes your itinerary, flight options, five-star stays, and transparent budget—instantly."
      />
      <section className="bg-cream-warm px-6 py-16 md:px-10 md:py-24 lg:px-16">
        <TravelGenerator />
      </section>
    </main>
  );
}
