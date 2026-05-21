"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { pagePreviews } from "@/lib/navigation";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function HomePreview() {
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
        <motion.div variants={fadeUp} custom={0} className="mb-14">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-muted">
            Explore Voyanté
          </p>
          <h2 className="font-serif text-4xl text-forest-deep md:text-5xl">
            Six worlds. One seamless journey.
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pagePreviews.map((page, i) => (
            <motion.div key={page.href} variants={fadeUp} custom={i + 1}>
              <Link
                href={page.href}
                className="group glass-card flex h-full flex-col rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-muted">
                  {page.tag}
                </span>
                <h3 className="mb-3 font-serif text-2xl text-charcoal">
                  {page.title}
                </h3>
                <p className="mb-8 flex-1 text-sm leading-relaxed text-charcoal-muted">
                  {page.description}
                </p>
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-forest-mid group-hover:text-gold">
                  Enter
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
