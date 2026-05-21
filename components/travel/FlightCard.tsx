import { Plane, ExternalLink } from "lucide-react";
import type { FlightOffer } from "@/lib/types/travel";

export default function FlightCard({ flight }: { flight: FlightOffer }) {
  return (
    <article className="glass-card rounded-2xl p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest/10 text-forest-mid">
            <Plane className="h-4 w-4" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-serif text-lg text-charcoal">{flight.airline}</h3>
            <p className="text-xs text-charcoal-muted">
              {flight.origin} → {flight.destination} · {flight.duration}
              {flight.cabin ? ` · ${flight.cabin}` : ""}
              {flight.stops === 0 ? " · Nonstop" : ` · ${flight.stops} stop(s)`}
            </p>
          </div>
        </div>
        <p className="text-right font-serif text-xl text-forest-deep">
          {flight.currency} {flight.price}
        </p>
      </div>
      <div className="grid gap-2 text-sm text-charcoal-muted sm:grid-cols-2">
        <p>
          <span className="text-[10px] uppercase tracking-wider text-gold-muted">
            Depart
          </span>
          <br />
          {flight.departure}
        </p>
        <p>
          <span className="text-[10px] uppercase tracking-wider text-gold-muted">
            Arrive
          </span>
          <br />
          {flight.arrival}
        </p>
      </div>
      {flight.seats > 0 && (
        <p className="mt-3 text-xs text-charcoal-muted">
          {flight.seats} seats available
        </p>
      )}
      {flight.bookingUrl && (
        <a
          href={flight.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-forest-mid hover:text-gold"
        >
          View & book
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
    </article>
  );
}
