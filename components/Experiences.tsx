"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { fadeUp } from "@/lib/motion";

const rows = [
  {
    title: "The art of effortless scheduling",
    subtitle: "AI time optimization",
    body: "Your days unfold with intentional rhythm—museum mornings before crowds, sunset dinners timed to golden hour, transit buffers calculated to the minute. Voyanté orchestrates time so you never feel rushed or idle.",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&q=80",
    alt: "Elegant travel planning at a luxury desk",
    imageLeft: true,
  },
  {
    title: "Hidden gems, intelligently revealed",
    subtitle: "Hyper-intelligent data analysis",
    body: "Beyond the guidebooks lies a layer of local intelligence—speakeasies behind unmarked doors, ateliers open by appointment only, trails known to a handful of residents. Our models surface what algorithms alone cannot.",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=80",
    alt: "Scenic coastal road through dramatic landscape",
    imageLeft: false,
  },
];

export default function Experiences() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="bg-cream-ivory px-6 py-24 md:px-10 md:py-32 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-muted">
            Experiences & Benefits
          </p>
          <h2 className="font-serif text-4xl text-forest-deep md:text-5xl">
            Where intelligence meets intuition
          </h2>
        </motion.div>

        <div className="space-y-24 md:space-y-32">
          {rows.map((row, index) => (
            <motion.div
              key={row.title}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              custom={index}
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                row.imageLeft ? "" : "lg:[&>*:first-child]:order-2"
              }`}
            >
              <div
                className={`relative aspect-[4/5] overflow-hidden rounded-[2rem] md:aspect-[5/4] ${
                  row.imageLeft ? "lg:pr-4" : "lg:pl-4"
                }`}
              >
                <div className="organic-blob absolute inset-0 overflow-hidden">
                  <Image
                    src={row.image}
                    alt={row.alt}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/30 to-transparent" />
              </div>

              <div className={row.imageLeft ? "lg:pl-8" : "lg:pr-8"}>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-gold-muted">
                  {row.subtitle}
                </p>
                <h3 className="mb-6 font-serif text-3xl leading-tight text-charcoal md:text-4xl">
                  {row.title}
                </h3>
                <p className="max-w-lg text-sm leading-relaxed text-charcoal-muted md:text-base">
                  {row.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
