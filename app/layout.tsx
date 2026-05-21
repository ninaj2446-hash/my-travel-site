import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import SiteLayout from "@/components/SiteLayout";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Voyanté — AI Travel Planner & Concierge",
    template: "%s | Voyanté",
  },
  description:
    "Elite AI-curated itineraries, seamless bookings, and bespoke journeys across the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="overflow-x-hidden">
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
