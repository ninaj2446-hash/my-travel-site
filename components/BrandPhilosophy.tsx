"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Gem, ShieldCheck } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

const values = [
  {
    icon: Target,
    title: "Precision",
    subtitle: "AI algorithms at your service",
    body: "Neural routing engines analyze millions of data points—weather patterns, crowd density, seasonal nuance—to deliver itineraries with surgical accuracy.",
  },
  {
    icon: Gem,
    title: "Exclusivity",
    subtitle: "Tailored luxury",
    body: "Every recommendation is filtered through your preferences: design sensibility, dietary philosophy, pace of life. Nothing generic ever reaches your itinerary.",
  },
  {
    icon: ShieldCheck,
    title: "Peace of Mind",
    subtitle: "24/7 AI concierge",
    body: "From midnight flight changes to last-minute table requests, your digital concierge responds instantly—so you remain present in the moment.",
  },
];

export default function BrandPhilosophy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="bg-cream px-6 py-24 md:px-10 md:py-32 lg:px-16"
    >
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="mx-auto max-w-7xl"
      >
        <motion.div variants={fadeUp} custom={0} className="mb-20 text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-muted">
            Brand Philosophy
          </p>
          <h2 className="font-serif text-4xl text-forest-deep md:text-5xl">
            The art of considered travel
          </h2>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-16">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              variants={fadeUp}
              custom={i + 1}
              className="flex flex-col items-center text-center md:items-start md:text-left"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-forest/10 bg-forest/5 text-forest-mid">
                <value.icon className="h-6 w-6" strokeWidth={1.25} />
              </div>
              <h3 className="mb-1 font-serif text-2xl text-charcoal">{value.title}</h3>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gold-muted">
                {value.subtitle}
              </p>
              <p className="max-w-sm text-sm leading-relaxed text-charcoal-muted">
                {value.body}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
