import { Building2, ExternalLink } from "lucide-react";
import type { HotelOffer } from "@/lib/types/travel";

export default function HotelCard({ hotel }: { hotel: HotelOffer }) {
  return (
    <article className="glass-card rounded-2xl p-6">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold-muted">
            <Building2 className="h-4 w-4" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-serif text-lg text-charcoal">{hotel.name}</h3>
            <p className="text-xs text-charcoal-muted">
              {hotel.city}
              {hotel.rating ? ` · ${hotel.rating}★` : ""}
            </p>
          </div>
        </div>
        <p className="text-right font-serif text-xl text-forest-deep">
          {hotel.currency} {hotel.price}
        </p>
      </div>
      <p className="text-xs text-charcoal-muted">
        {hotel.checkIn} → {hotel.checkOut}
      </p>
      {hotel.address && (
        <p className="mt-2 text-sm text-charcoal-muted">{hotel.address}</p>
      )}
      {hotel.bookingUrl && (
        <a
          href={hotel.bookingUrl}
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
