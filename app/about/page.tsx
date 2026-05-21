import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BrandPhilosophy from "@/components/BrandPhilosophy";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Voyanté philosophy—precision through AI, tailored exclusivity, and unwavering peace of mind.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About Voyanté"
        title="The art of considered travel"
        subtitle="We exist for travelers who refuse compromise—where algorithmic mastery serves human desire, and silence is the ultimate luxury."
      />
      <BrandPhilosophy />
    </main>
  );
}
