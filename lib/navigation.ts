export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/generator", label: "Generator" },
  { href: "/assistant", label: "Assistant" },
  { href: "/planner", label: "Planner" },
  { href: "/destinations", label: "Destinations" },
  { href: "/concierge", label: "Concierge" },
  { href: "/about", label: "About" },
] as const;

export const footerNav = {
  Platform: [
    { label: "Travel Generator", href: "/generator" },
    { label: "AI Assistant", href: "/assistant" },
    { label: "AI Planner", href: "/planner" },
    { label: "Destinations", href: "/destinations" },
  ],
  Company: [
    { label: "About Voyanté", href: "/about" },
    { label: "Concierge", href: "/concierge" },
    { label: "Promo Film", href: "/promo" },
    { label: "Home", href: "/" },
  ],
  Legal: [
    { label: "Privacy", href: "/about" },
    { label: "Terms", href: "/about" },
    { label: "Cookies", href: "/about" },
  ],
};

export const pagePreviews = [
  {
    href: "/generator",
    title: "Travel Generator",
    description: "Instant AI itinerary, flights, hotels & budget.",
    tag: "Book",
  },
  {
    href: "/assistant",
    title: "AI Assistant",
    description: "Chat with concierge—plans trips in seconds.",
    tag: "AI",
  },
  {
    href: "/planner",
    title: "AI Planner",
    description: "Routes, bookings, and budgets orchestrated in one suite.",
    tag: "Services",
  },
  {
    href: "/destinations",
    title: "Destinations",
    description: "Editorial journeys and hidden gems across the globe.",
    tag: "Explore",
  },
  {
    href: "/concierge",
    title: "Concierge",
    description: "24/7 intelligence for every moment of your voyage.",
    tag: "Support",
  },
  {
    href: "/promo",
    title: "Campaign Film",
    description: "Watch the Voyanté story—effortless luxury in motion.",
    tag: "Watch",
  },
];
