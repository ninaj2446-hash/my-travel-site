import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#1a3d2e",
          deep: "#0f2922",
          mid: "#2d5a45",
          light: "#3d6b54",
        },
        cream: {
          DEFAULT: "#f8f5f0",
          warm: "#faf7f2",
          ivory: "#f3efe8",
        },
        gold: {
          DEFAULT: "#c9a962",
          bright: "#d4af37",
          muted: "#b8956a",
          glow: "rgba(201, 169, 98, 0.35)",
        },
        charcoal: {
          DEFAULT: "#1c1c1c",
          soft: "#2a2a2a",
          muted: "#3d3d3d",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "ambient-radial":
          "radial-gradient(ellipse 80% 60% at 20% 40%, rgba(45, 90, 69, 0.12) 0%, transparent 70%)",
        "ambient-gold":
          "radial-gradient(ellipse 50% 40% at 85% 20%, rgba(201, 169, 98, 0.08) 0%, transparent 60%)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(15, 41, 34, 0.12)",
        "gold-glow": "0 0 40px rgba(201, 169, 98, 0.25)",
        "gold-glow-sm": "0 0 20px rgba(201, 169, 98, 0.2)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
