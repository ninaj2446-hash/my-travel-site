import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AIAssistant from "@/components/travel/AIAssistant";

export const metadata: Metadata = {
  title: "AI Assistant",
  description:
    "Voyanté AI concierge with instant trip planning.",
};

export default function AssistantPage() {
  return (
    <main>
      <PageHero
        eyebrow="AI Concierge"
        title="Your private travel intelligence"
        subtitle="Natural conversation with instant luxury itineraries, flights, hotels, and budgets when you describe a route."
      />
      <section className="bg-cream-warm px-6 py-16 md:px-10 md:py-24 lg:px-16">
        <AIAssistant />
      </section>
    </main>
  );
}
