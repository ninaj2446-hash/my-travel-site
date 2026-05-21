"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, MessageCircle, Sparkles } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

const features = [
  {
    icon: Clock,
    title: "Always Present",
    body: "Midnight rebookings, dawn lounge access, and real-time itinerary pivots—handled before you finish your espresso.",
  },
  {
    icon: MessageCircle,
    title: "Natural Dialogue",
    body: "Speak as you would to a human concierge. Voyanté understands nuance, preference, and the unspoken.",
  },
  {
    icon: Sparkles,
    title: "Anticipatory Care",
    body: "Weather shifts, local events, and sentiment signals trigger proactive suggestions—not reactive fixes.",
  },
];

export default function ConciergeFeatures() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="bg-cream-warm px-6 py-20 md:px-10 md:py-28 lg:px-16"
    >
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3"
      >
        {features.map((f, i) => (
          <motion.article
            key={f.title}
            variants={fadeUp}
            custom={i}
            className="glass-card rounded-3xl p-8"
          >
            <f.icon className="mb-4 h-6 w-6 text-forest-mid" strokeWidth={1.25} />
            <h3 className="mb-3 font-serif text-xl text-charcoal">{f.title}</h3>
            <p className="text-sm leading-relaxed text-charcoal-muted">{f.body}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
