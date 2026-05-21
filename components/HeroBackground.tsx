"use client";

import { useState } from "react";

export default function HeroBackground() {
  const [videoOk, setVideoOk] = useState(true);

  return (
    <>
      <div
        className="absolute inset-0 bg-gradient-to-br from-forest-deep via-forest-mid to-forest-light"
        aria-hidden
      />
      {videoOk && (
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
        className="absolute inset-0 bg-gradient-to-br from-forest-deep/85 via-forest-deep/60 to-forest/40"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-transparent to-forest-deep/30"
        aria-hidden
      />
    </>
  );
}
