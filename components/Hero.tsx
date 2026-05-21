"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroBackground from "@/components/HeroBackground";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <HeroBackground />

      <motion.div
        className="relative z-10 flex min-h-screen flex-col justify-between px-6 pb-16 pt-28 md:px-10 md:pb-20 md:pt-32 lg:px-16 lg:pb-24"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp} custom={0} className="max-w-[90vw] lg:max-w-5xl">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em] text-gold md:text-xs">
            AI Elite Travel
          </p>
          <h1 className="font-serif text-[clamp(3.5rem,12vw,14rem)] font-bold uppercase leading-[0.88] tracking-tight text-cream">
            Journey
            <br />
            <span className="text-cream/90">Rewritten</span>
          </h1>
        </motion.div>

        <div className="mt-auto flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
          <motion.div variants={fadeUp} custom={2} className="flex flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/generator"
                className="group inline-flex items-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-cream shadow-gold-glow-sm backdrop-blur-sm transition-shadow duration-500 hover:shadow-gold-glow"
              >
                Live Trip Generator
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/assistant"
                className="inline-flex items-center rounded-full border border-cream/25 bg-white/5 px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-cream/90 backdrop-blur-sm transition-colors duration-300 hover:border-cream/40 hover:bg-white/10"
              >
                AI Assistant
              </Link>
            </motion.div>
          </motion.div>

          <motion.p
            variants={fadeUp}
            custom={3}
            className="max-w-xs self-end text-right text-sm leading-relaxed text-cream/75 md:max-w-sm md:text-[15px] lg:max-w-md"
          >
            We believe travel should feel effortless—curated by intelligence,
            refined by taste, and delivered with the quiet confidence of a
            private club. Every journey begins with a single, perfect plan.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
