"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedCounter from "./AnimatedCounter";
import { fadeUp, staggerContainer } from "@/lib/motion";

const stats = [
  {
    value: 140,
    suffix: "+",
    label: "Countries Canvas",
    description: "Curated destinations across every continent",
    animate: true,
  },
  {
    value: 0.4,
    suffix: "s",
    label: "Tailored Itinerary",
    description: "From intent to full-day plan",
    animate: true,
    decimals: 1,
  },
  {
    value: 100,
    suffix: "%",
    label: "Bespoke",
    description: "No template itineraries—ever",
    animate: true,
  },
];

export default function CuratedStats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-forest-deep px-6 py-24 md:px-10 md:py-32 lg:px-16"
    >
      <div
        className="pointer-events-none absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-forest-mid/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-gold/10 blur-3xl"
        aria-hidden
      />

      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="relative mx-auto max-w-7xl"
      >
        <motion.p
          variants={fadeUp}
          custom={0}
          className="mb-16 text-center text-[10px] font-semibold uppercase tracking-[0.35em] text-gold/80"
        >
          Curated by Intelligence
        </motion.p>

        <div className="grid gap-16 md:grid-cols-3 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              custom={i + 1}
              className="text-center"
            >
              <p className="font-serif text-5xl text-cream md:text-6xl lg:text-7xl">
                {stat.animate ? (
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals ?? 0}
                  />
                ) : (
                  <>
                    {stat.value}
                    {stat.suffix}
                  </>
                )}
              </p>
              <p className="mt-4 font-serif text-lg italic text-gold/90 md:text-xl">
                {stat.label}
              </p>
              <p className="mt-2 text-sm text-cream/50">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
