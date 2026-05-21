"use client";

import { useState } from "react";

type VideoBackgroundProps = {
  src?: string;
  fallbackSrc?: string;
  className?: string;
};

export default function VideoBackground({
  src = "/ad-video.mp4",
  fallbackSrc = "/video.mp4",
  className = "absolute inset-0 h-full w-full object-cover",
}: VideoBackgroundProps) {
  const [useFallback, setUseFallback] = useState(false);
  const [hidden, setHidden] = useState(false);

  if (hidden) {
    return (
      <div
        className={`${className} bg-gradient-to-br from-forest-deep via-charcoal to-forest-mid`}
        aria-hidden
      />
    );
  }

  const currentSrc = useFallback ? fallbackSrc : src;

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      className={className}
      onError={() => {
        if (!useFallback && fallbackSrc !== src) {
          setUseFallback(true);
        } else {
          setHidden(true);
        }
      }}
    >
      <source src={currentSrc} type="video/mp4" />
    </video>
  );
}
