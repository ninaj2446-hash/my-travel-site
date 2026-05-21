"use client";

import { useEffect, useState } from "react";
import { youtubeEmbedUrl } from "@/lib/promo-videos";

type HeroBackgroundProps = {
  youtubeVideoId?: string;
};

export default function HeroBackground({ youtubeVideoId }: HeroBackgroundProps) {
  const [videoOk, setVideoOk] = useState(!youtubeVideoId);
  const [youtubeSrc, setYoutubeSrc] = useState(() =>
    youtubeVideoId ? youtubeEmbedUrl(youtubeVideoId, true) : ""
  );

  useEffect(() => {
    if (!youtubeVideoId) return;
    setYoutubeSrc(youtubeEmbedUrl(youtubeVideoId, true, window.location.origin));
  }, [youtubeVideoId]);

  const useYouTube = Boolean(youtubeVideoId);

  return (
    <>
      <div
        className="absolute inset-0 bg-gradient-to-br from-forest-deep via-forest-mid to-forest-light"
        aria-hidden
      />
      {useYouTube && youtubeSrc && (
        <iframe
          src={youtubeSrc}
          title="Voyanté hero film"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 z-[1] h-full w-full border-0 object-cover"
        />
      )}
      {!useYouTube && videoOk && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setVideoOk(false)}
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
      )}
      <div
        className="absolute inset-0 z-[2] bg-gradient-to-br from-forest-deep/85 via-forest-deep/60 to-forest/40"
        aria-hidden
      />
      <div
        className="absolute inset-0 z-[2] bg-gradient-to-t from-forest-deep/90 via-transparent to-forest-deep/30"
        aria-hidden
      />
    </>
  );
}
