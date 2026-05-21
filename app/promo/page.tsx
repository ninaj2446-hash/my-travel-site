import type { Metadata } from "next";

import VideoAd from "@/components/VideoAd";

import { PROMO_VIDEOS } from "@/lib/promo-videos";

import Link from "next/link";

import { ArrowRight } from "lucide-react";



export const metadata: Metadata = {

  title: "Promo Film",

  description:

    "Watch the Voyanté brand campaign—AI-curated luxury travel in cinematic form.",

};



export default function PromoPage() {

  return (

    <main>

      <VideoAd variant="cinema" youtubeVideoId={PROMO_VIDEOS[0].id} />

      <section className="bg-cream px-6 py-20 md:px-10 md:py-28 lg:px-16">

        <div className="mx-auto max-w-3xl text-center">

          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-muted">

            Campaign 2026

          </p>

          <h2 className="font-serif text-3xl text-forest-deep md:text-4xl">

            Ready to write your own chapter?

          </h2>

          <p className="mt-6 text-sm leading-relaxed text-charcoal-muted md:text-base">

            The film is an invitation. Your journey begins when you entrust

            Voyanté with the first detail—and we compose the rest.

          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <Link

              href="/generator"

              className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-forest-deep transition-shadow hover:shadow-gold-glow-sm"

            >

              Start Planning

              <ArrowRight className="h-4 w-4" />

            </Link>

            <Link

              href="/"

              className="inline-flex items-center rounded-full border border-forest/20 px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-forest-mid transition-colors hover:border-forest/40"

            >

              Return Home

            </Link>

          </div>

        </div>

      </section>

    </main>

  );

}

