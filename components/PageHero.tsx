"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export default function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-forest-deep px-6 pb-20 pt-32 md:px-10 md:pb-24 md:pt-40 lg:px-16">
      <div
        className="pointer-events-none absolute inset-0 bg-ambient-gold opacity-60"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-forest-mid/30 blur-3xl"
        aria-hidden
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={0}
        className="relative mx-auto max-w-7xl"
      >
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-gold">
          {eyebrow}
        </p>
        <h1 className="max-w-4xl font-serif text-4xl text-cream md:text-6xl lg:text-7xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/65 md:text-lg">
            {subtitle}
          </p>
        )}
      </motion.div>
    </section>
  );
}
