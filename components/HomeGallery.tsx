"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

const galleryItems = [
  {
    src: "/images/home-alpine.png",
    alt: "Friends planning a luxury alpine retreat with Voyanté on tablet",
    title: "Alpine retreats",
    caption: "Curated chalets, private guides, and seamless mountain transfers.",
    tag: "Winter",
    href: "/generator",
    span: "lg:col-span-2 lg:row-span-2",
    aspect: "aspect-[4/5] lg:aspect-auto lg:min-h-[520px]",
  },
  {
    src: "/images/home-yacht.png",
    alt: "Travelers on a yacht reviewing an Aegean sailing itinerary",
    title: "Aegean sailing",
    caption: "Day-by-day routes composed for the sea—printed and on mobile.",
    tag: "Coastal",
    href: "/generator",
    span: "",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/home-concierge.png",
    alt: "Luxury concierge planning flights with private jets in view",
    title: "Executive concierge",
    caption: "Business-class orchestration from lounge to runway.",
    tag: "Aviation",
    href: "/assistant",
    span: "",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/home-zen.png",
    alt: "Guests in a Zen garden using Voyanté travel planner on tablet",
    title: "Cultural immersion",
    caption: "Slow travel, heritage stays, and AI-refined preferences.",
    tag: "Asia",
    href: "/destinations",
    span: "lg:col-span-2",
    aspect: "aspect-[21/9] lg:aspect-[2.4/1]",
  },
];

export default function HomeGallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="bg-cream-ivory px-6 py-24 md:px-10 md:py-32 lg:px-16"
    >
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="mx-auto max-w-7xl"
      >
        <motion.div variants={fadeUp} custom={0} className="mb-14 max-w-2xl">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-muted">
            Voyanté in the world
          </p>
          <h2 className="font-serif text-4xl text-forest-deep md:text-5xl">
            Journeys imagined,
            <span className="italic text-forest-mid"> then lived</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-charcoal-muted md:text-base">
            From alpine lodges to private decks and serene gardens—every scene
            reflects the calm precision of AI-curated luxury travel.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-4 lg:grid-rows-2 lg:gap-6">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.src}
              variants={fadeUp}
              custom={i + 1}
              className={`group relative overflow-hidden rounded-[1.75rem] ${item.span}`}
            >
              <Link href={item.href} className="block h-full">
                <div className={`relative w-full overflow-hidden ${item.aspect}`}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/75 via-forest-deep/15 to-transparent" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <span className="mb-2 inline-block text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
                    {item.tag}
                  </span>
                  <h3 className="font-serif text-2xl text-cream md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-cream/75">
                    {item.caption}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Explore
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
