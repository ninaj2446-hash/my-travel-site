"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

type VideoAdProps = {
  variant?: "banner" | "cinema";
};

export default function VideoAd({ variant = "banner" }: VideoAdProps) {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [hasVideo, setHasVideo] = useState(true);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const isCinema = variant === "cinema";

  return (
    <section
      ref={ref}
      className={
        isCinema
          ? "relative min-h-[85vh] bg-charcoal"
          : "bg-cream-warm px-6 py-20 md:px-10 md:py-28 lg:px-16"
      }
    >
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
        className={isCinema ? "relative h-full min-h-[85vh]" : "mx-auto max-w-7xl"}
      >
        {!isCinema && (
          <motion.div variants={fadeUp} custom={0} className="mb-10 max-w-2xl">
            <span className="mb-3 inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-muted">
              Sponsored Film
            </span>
            <h2 className="font-serif text-4xl text-forest-deep md:text-5xl">
              Voyanté — The Art of Arrival
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-charcoal-muted md:text-base">
              Our brand film captures the philosophy behind AI-curated luxury:
              silence, precision, and journeys written entirely for you.
            </p>
          </motion.div>
        )}

        <motion.div
          variants={fadeUp}
          custom={1}
          className={`relative overflow-hidden ${
            isCinema
              ? "h-full min-h-[85vh]"
              : "organic-blob rounded-[2rem] shadow-glass"
          }`}
        >
          <div
            className={`bg-gradient-to-br from-forest-deep via-charcoal to-forest-mid ${
              isCinema ? "absolute inset-0 min-h-[85vh]" : "aspect-video w-full"
            }`}
          >
            {hasVideo && (
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className={`w-full object-cover ${
                  isCinema ? "absolute inset-0 h-full min-h-[85vh]" : "aspect-video"
                }`}
                onError={() => setHasVideo(false)}
              >
                <source src="/ad-video.mp4" type="video/mp4" />
                <source src="/video.mp4" type="video/mp4" />
              </video>
            )}
          </div>

          <div
            className={`absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-forest-deep/20 to-transparent ${
              isCinema ? "from-charcoal/90" : ""
            }`}
            aria-hidden
          />

          {isCinema && (
            <div className="absolute inset-x-0 top-28 z-10 px-6 md:px-16">
              <span className="rounded-full border border-gold/40 bg-gold/15 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                Brand Campaign 2026
              </span>
              <h1 className="mt-6 max-w-3xl font-serif text-4xl text-cream md:text-6xl">
                Where intelligence meets the horizon
              </h1>
            </div>
          )}

          <div
            className={`absolute z-10 flex items-center gap-3 ${
              isCinema
                ? "bottom-8 left-6 right-6 md:bottom-12 md:left-16 md:right-16"
                : "bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6"
            }`}
          >
            {hasVideo && (
              <>
                <button
                  type="button"
                  onClick={togglePlay}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/30 bg-forest-deep/60 text-cream backdrop-blur-md transition-colors hover:border-gold/50 hover:text-gold"
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5 fill-current" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/30 bg-forest-deep/60 text-cream backdrop-blur-md transition-colors hover:border-gold/50 hover:text-gold"
                  aria-label={muted ? "Unmute" : "Mute"}
                >
                  {muted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </button>
              </>
            )}
            {!isCinema && (
              <Link
                href="/promo"
                className="ml-auto inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-cream backdrop-blur-sm transition-all hover:shadow-gold-glow-sm"
              >
                Full Experience
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </motion.div>

        {isCinema && (
          <motion.p
            variants={fadeUp}
            custom={2}
            className="absolute bottom-28 left-6 right-6 z-10 max-w-xl text-sm leading-relaxed text-cream/70 md:left-16 md:text-base"
          >
            A cinematic invitation to travel reimagined—every frame composed for
            those who demand more than a itinerary. They demand a masterpiece.
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
