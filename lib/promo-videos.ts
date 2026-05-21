export type PromoVideo = {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  /** YouTube Shorts use vertical aspect in the embed */
  format?: "video" | "short";
};

export const PROMO_VIDEOS: PromoVideo[] = [
  {
    id: "l_zaFIPm58o",
    title: "The Art of Arrival",
    subtitle:
      "Our signature brand film—AI-curated luxury, composed with cinematic precision.",
    tag: "Brand Film",
    format: "video",
  },
  {
    id: "5bx4b3hdwN8",
    title: "Journey in Motion",
    subtitle:
      "A short invitation to travel reimagined—effortless, exclusive, entirely yours.",
    tag: "Campaign Short",
    format: "short",
  },
];

export function youtubeEmbedUrl(
  videoId: string,
  autoplay = false,
  origin?: string
) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  if (origin) {
    params.set("origin", origin);
  }
  if (autoplay) {
    params.set("autoplay", "1");
    params.set("mute", "1");
  }
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

export function youtubeWatchUrl(videoId: string, format?: PromoVideo["format"]) {
  if (format === "short") {
    return `https://www.youtube.com/shorts/${videoId}`;
  }
  return `https://www.youtube.com/watch?v=${videoId}`;
}
