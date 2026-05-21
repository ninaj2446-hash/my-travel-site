"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import AirportInput from "./AirportInput";
import FlightCard from "./FlightCard";
import HotelCard from "./HotelCard";
import BudgetPanel from "./BudgetPanel";
import type { TravelSearchResult } from "@/lib/types/travel";

function defaultDeparture() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().slice(0, 10);
}

export default function TravelGenerator() {
  const [origin, setOrigin] = useState("MAD");
  const [destination, setDestination] = useState("PAR");
  const [departureDate, setDepartureDate] = useState(defaultDeparture());
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [preferences, setPreferences] = useState(
    "luxury, culture, fine dining"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TravelSearchResult | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/travel/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin,
          destination,
          departureDate,
          returnDate: returnDate || undefined,
          adults,
          preferences,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Generation failed");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl">
      <form
        onSubmit={handleSearch}
        className="glass-card mb-12 rounded-3xl p-8 md:p-10"
      >
        <div className="mb-8 flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-gold" />
          <p className="text-sm text-charcoal-muted">
            Voyanté Intelligence — instant premium itineraries, curated flights,
            five-star hotels, and a transparent luxury budget. No API keys
            required.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <AirportInput label="From" value={origin} onChange={setOrigin} />
          <AirportInput
            label="To"
            value={destination}
            onChange={setDestination}
          />
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-charcoal-muted">
              Depart
            </label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              required
              className="w-full rounded-2xl border border-forest/15 bg-white/80 px-4 py-3.5 text-sm outline-none focus:border-gold/50"
            />
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-charcoal-muted">
              Return (optional)
            </label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full rounded-2xl border border-forest/15 bg-white/80 px-4 py-3.5 text-sm outline-none focus:border-gold/50"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-charcoal-muted">
              Travelers
            </label>
            <input
              type="number"
              min={1}
              max={9}
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="w-full rounded-2xl border border-forest/15 bg-white/80 px-4 py-3.5 text-sm outline-none focus:border-gold/50"
            />
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-charcoal-muted">
              Preferences
            </label>
            <input
              type="text"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              className="w-full rounded-2xl border border-forest/15 bg-white/80 px-4 py-3.5 text-sm outline-none focus:border-gold/50"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-10 py-4 text-sm font-medium uppercase tracking-[0.18em] text-forest-deep transition-all hover:shadow-gold-glow-sm disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Composing your journey…
            </>
          ) : (
            "Generate premium journey"
          )}
        </button>
      </form>

      {error && (
        <p className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {error}
        </p>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {result.budget && <BudgetPanel budget={result.budget} />}

          {result.itinerary && (
            <section className="rounded-3xl border border-forest/10 bg-forest-deep/5 p-8 md:p-10">
              <h2 className="mb-4 font-serif text-2xl text-forest-deep">
                AI itinerary
              </h2>
              <div className="max-w-none whitespace-pre-wrap text-sm leading-relaxed text-charcoal-muted md:text-base">
                {result.itinerary}
              </div>
            </section>
          )}

          <section>
            <h2 className="mb-6 font-serif text-2xl text-forest-deep">
              Curated flights ({result.flights.length})
            </h2>
            <div className="grid gap-4 lg:grid-cols-2">
              {result.flights.map((f) => (
                <FlightCard key={f.id} flight={f} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 font-serif text-2xl text-forest-deep">
              Five-star hotels ({result.hotels.length})
            </h2>
            <div className="grid gap-4 lg:grid-cols-2">
              {result.hotels.map((h) => (
                <HotelCard key={h.id} hotel={h} />
              ))}
            </div>
          </section>
        </motion.div>
      )}
    </div>
  );
}
