"use client";

import { useEffect, useRef, useState } from "react";
import type { AirportSuggestion } from "@/lib/types/travel";

type AirportInputProps = {
  label: string;
  value: string;
  onChange: (iata: string) => void;
  placeholder?: string;
};

export default function AirportInput({
  label,
  value,
  onChange,
  placeholder = "e.g. NYC",
}: AirportInputProps) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<AirportSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/airports?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setSuggestions(data.suggestions ?? []);
        setOpen(true);
      } catch {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-charcoal-muted">
        {label}
      </label>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          const v = e.target.value.toUpperCase();
          setQuery(v);
          if (v.length === 3) onChange(v);
        }}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        placeholder={placeholder}
        maxLength={40}
        className="w-full rounded-2xl border border-forest/15 bg-white/80 px-4 py-3.5 text-sm text-charcoal outline-none transition-colors focus:border-gold/50 focus:ring-2 focus:ring-gold/10"
      />
      {open && suggestions.length > 0 && (
        <ul className="absolute z-20 mt-1 max-h-48 w-full overflow-auto rounded-2xl border border-forest/10 bg-cream shadow-glass">
          {suggestions.map((s) => (
            <li key={s.iata}>
              <button
                type="button"
                className="w-full px-4 py-3 text-left text-sm hover:bg-forest/5"
                onClick={() => {
                  onChange(s.iata);
                  setQuery(s.iata);
                  setOpen(false);
                }}
              >
                <span className="font-semibold text-forest-deep">{s.iata}</span>
                <span className="ml-2 text-charcoal-muted">
                  {s.city || s.name}
                  {s.country ? `, ${s.country}` : ""}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
