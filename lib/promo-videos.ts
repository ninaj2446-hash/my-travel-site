export type PromoVideo = {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
};

export const PROMO_VIDEOS: PromoVideo[] = [
  {
    id: "l_zaFIPm58o",
    title: "The Art of Arrival",
    subtitle:
      "Our signature brand film—AI-curated luxury, composed with cinematic precision.",
    tag: "Brand Film",
  },
  {
    id: "5bx4b3hdwN8",
    title: "Journey in Motion",
    subtitle:
      "A short invitation to travel reimagined—effortless, exclusive, entirely yours.",
    tag: "Campaign Short",
  },
];

export function youtubeEmbedUrl(videoId: string, autoplay = false) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  if (autoplay) {
    params.set("autoplay", "1");
    params.set("mute", "1");
  }
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

export function youtubeWatchUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}
