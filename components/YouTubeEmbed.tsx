"use client";

import { useEffect, useState } from "react";
import { youtubeEmbedUrl, youtubeWatchUrl } from "@/lib/promo-videos";
import { ExternalLink } from "lucide-react";

type YouTubeEmbedProps = {
  videoId: string;
  title: string;
  className?: string;
  aspect?: "video" | "short";
  autoplay?: boolean;
  watchFormat?: "video" | "short";
};

export default function YouTubeEmbed({
  videoId,
  title,
  className = "",
  aspect = "video",
  autoplay = false,
  watchFormat,
}: YouTubeEmbedProps) {
  const [embedSrc, setEmbedSrc] = useState(() =>
    youtubeEmbedUrl(videoId, autoplay)
  );

  useEffect(() => {
    setEmbedSrc(youtubeEmbedUrl(videoId, autoplay, window.location.origin));
  }, [videoId, autoplay]);

  const aspectClass =
    aspect === "short" ? "aspect-[9/16] max-w-sm mx-auto" : "aspect-video";

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-charcoal ${className}`}>
      <div className={`relative w-full ${aspectClass}`}>
        <iframe
          src={embedSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
        />
      </div>
      <a
        href={youtubeWatchUrl(videoId, watchFormat ?? aspect)}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-cream/20 bg-forest-deep/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-cream/90 backdrop-blur-sm transition-colors hover:text-gold"
      >
        YouTube
        <ExternalLink className="h-3 w-3" />
      </a>
    </div>
  );
}
