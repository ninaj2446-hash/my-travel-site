# Voyanté — Premium AI Travel Planner

A luxury landing page built with Next.js, Tailwind CSS, Framer Motion, and Lucide React.

## AI Generator & Assistant

Works **without API keys** — premium mock flights, hotels, budgets, and itineraries are generated instantly.

- **Generator**: `/generator` — full trip with budget breakdown  
- **Assistant**: `/assistant` — chat; try *"Plan MAD to PAR on 2025-11-08"*  

Popular airport codes in autocomplete: NYC, LON, PAR, MAD, BCN, ROM, DXB, TYO, SYD, MIA, MIL, ZRH.

## Getting started

1. **Place your hero video** — `video.mp4` and optional `ad-video.mp4` in project root (synced to `public/` on dev).

2. **Install dependencies** (requires Node.js 18+):

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Pages

| URL | Content |
|-----|---------|
| `/` | Hero, video ad, explore cards |
| `/generator` | **Live** flight/hotel search + AI itinerary |
| `/assistant` | **AI chat** + live search in conversation |
| `/planner` | Services overview + links to generator |
| `/destinations` | Experiences & editorial journeys |
| `/concierge` | Concierge features + stats |
| `/about` | Brand philosophy |
| `/promo` | Promotional video |

## Videos

| File (project root) | Used for |
|---------------------|----------|
| `video.mp4` | Home hero background |
| `ad-video.mp4` | Promo / advertising (falls back to `video.mp4` if missing) |

Both sync to `public/` on `npm run dev` / `npm run build`.

## Design tokens

- **Forest greens** — `forest`, `forest-deep`, `forest-mid`
- **Cream/ivory** — `cream`, `cream-warm`, `cream-ivory`
- **Gold accents** — `gold`, `gold-muted`, `gold-glow`
- **Charcoal** — `charcoal`, `charcoal-muted`

Fonts: Playfair Display (headlines), Inter (body) via `next/font`.
