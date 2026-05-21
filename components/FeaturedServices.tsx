"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  Route,
  Plane,
  Wallet,
  MapPinned,
  ArrowUpRight,
} from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

const services = [
  {
    icon: Route,
    title: "AI Route Generation",
    description:
      "Multi-city itineraries crafted in seconds—balancing culture, cuisine, and pace with the discernment of a seasoned travel director.",
    cta: "Explore Routes",
    href: "/generator",
  },
  {
    icon: Plane,
    title: "Seamless Bookings",
    description:
      "First-class flights and five-star stays confirmed in one fluid flow. No tabs, no friction—only confirmation and calm.",
    cta: "Reserve Now",
    href: "/generator",
  },
  {
    icon: Wallet,
    title: "Smart Budgeting",
    description:
      "Intelligent spend allocation across experiences, lodging, and transit—with real-time adjustments as your vision evolves.",
    cta: "Plan Budget",
    href: "/generator",
  },
  {
    icon: MapPinned,
    title: "Interactive Maps",
    description:
      "Immersive cartography with insider layers—neighborhood rhythms, reservation windows, and hidden passages only locals know.",
    cta: "View Canvas",
    href: "/destinations",
  },
];

export default function FeaturedServices() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-cream-warm px-6 py-24 md:px-10 md:py-32 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-ambient-radial" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-ambient-gold" aria-hidden />

      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="relative mx-auto max-w-7xl"
      >
        <motion.div variants={fadeUp} custom={0} className="mb-16 max-w-2xl">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-muted">
            Featured Services
          </p>
          <h2 className="font-serif text-4xl text-forest-deep md:text-5xl lg:text-6xl">
            Everything orchestrated,
            <span className="italic text-forest-mid"> nothing left to chance</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {services.map((service, i) => (
            <motion.article
              key={service.title}
              variants={fadeUp}
              custom={i + 1}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group glass-card organic-blob flex flex-col rounded-3xl p-8 md:rounded-[2rem]"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/10 text-forest-mid transition-colors duration-300 group-hover:bg-gold/15 group-hover:text-gold">
                <service.icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 font-serif text-xl text-charcoal">{service.title}</h3>
              <p className="mb-8 flex-1 text-sm leading-relaxed text-charcoal-muted">
                {service.description}
              </p>
              <Link
                href={service.href}
                className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-forest-mid transition-colors duration-300 hover:text-gold"
              >
                {service.cta}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
