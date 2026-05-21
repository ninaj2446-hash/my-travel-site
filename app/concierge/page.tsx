import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CuratedStats from "@/components/CuratedStats";
import ConciergeFeatures from "@/components/ConciergeFeatures";

export const metadata: Metadata = {
  title: "Concierge",
  description:
    "24/7 AI concierge—anticipatory care, natural dialogue, and instant travel support.",
};

export default function ConciergePage() {
  return (
    <main>
      <PageHero
        eyebrow="Concierge"
        title="Intelligence that never sleeps"
        subtitle="Your private digital concierge—present at every hour, fluent in every request, devoted to your peace of mind."
      />
      <section className="bg-cream px-6 py-12 text-center md:px-10">
        <Link
          href="/assistant"
          className="inline-flex rounded-full border border-gold/40 bg-gold/10 px-10 py-4 text-sm font-medium uppercase tracking-[0.18em] text-forest-deep"
        >
          Launch AI Concierge
        </Link>
      </section>
      <ConciergeFeatures />
      <CuratedStats />
    </main>
  );
}
