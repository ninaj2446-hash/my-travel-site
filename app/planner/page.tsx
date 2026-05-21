import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FeaturedServices from "@/components/FeaturedServices";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Planner",
  description:
    "AI route generation, seamless flight and hotel bookings, smart budgeting, and interactive maps.",
};

export default function PlannerPage() {
  return (
    <main>
      <PageHero
        eyebrow="AI Planner"
        title="Orchestrate every detail of your journey"
        subtitle="From multi-city routes to five-star confirmations—Voyanté unifies planning, booking, and budgeting into one serene interface."
      />
      <section className="bg-cream px-6 py-12 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-4">
          <Link
            href="/generator"
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-forest-deep"
          >
            Open live generator
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/assistant"
            className="inline-flex items-center rounded-full border border-forest/20 px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-forest-mid"
          >
            Chat with AI concierge
          </Link>
        </div>
      </section>
      <FeaturedServices />
    </main>
  );
}
