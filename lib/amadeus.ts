import type { AirportSuggestion, FlightOffer, HotelOffer } from "@/lib/types/travel";

const TEST_BASE = "https://test.api.amadeus.com";
const PROD_BASE = "https://api.amadeus.com";

let cachedToken: { value: string; expiresAt: number } | null = null;

function getBaseUrl() {
  return process.env.AMADEUS_ENV === "production" ? PROD_BASE : TEST_BASE;
}

export function isAmadeusConfigured() {
  return Boolean(
    process.env.AMADEUS_CLIENT_ID && process.env.AMADEUS_CLIENT_SECRET
  );
}

async function getAccessToken(): Promise<string> {
  if (!isAmadeusConfigured()) {
    throw new Error(
      "Amadeus API keys missing. Add AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET to .env.local"
    );
  }

  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return cachedToken.value;
  }

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: process.env.AMADEUS_CLIENT_ID!,
    client_secret: process.env.AMADEUS_CLIENT_SECRET!,
  });

  const res = await fetch(`${getBaseUrl()}/v1/security/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Amadeus auth failed: ${err}`);
  }

  const data = (await res.json()) as {
    access_token: string;
    expires_in: number;
  };

  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return data.access_token;
}

async function amadeusFetch<T>(path: string, params?: Record<string, string>) {
  const token = await getAccessToken();
  const url = new URL(`${getBaseUrl()}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v) url.searchParams.set(k, v);
    });
  }

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Amadeus ${path}: ${err}`);
  }

  return res.json() as Promise<T>;
}

export async function searchAirports(
  keyword: string
): Promise<AirportSuggestion[]> {
  if (keyword.length < 2) return [];

  const data = await amadeusFetch<{
    data?: Array<{
      iataCode?: string;
      name?: string;
      address?: { cityName?: string; countryName?: string };
    }>;
  }>("/v1/reference-data/locations", {
    keyword: keyword.toUpperCase(),
    subType: "AIRPORT,CITY",
    "page[limit]": "8",
  });

  return (data.data ?? [])
    .filter((loc) => loc.iataCode)
    .map((loc) => ({
      iata: loc.iataCode!,
      name: loc.name ?? loc.iataCode!,
      city: loc.address?.cityName ?? "",
      country: loc.address?.countryName ?? "",
    }));
}

function formatDuration(iso: string) {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return iso;
  const h = match[1] ? `${match[1]}h ` : "";
  const m = match[2] ? `${match[2]}m` : "";
  return `${h}${m}`.trim();
}

export async function searchFlights(params: {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults?: number;
}): Promise<FlightOffer[]> {
  const query: Record<string, string> = {
    originLocationCode: params.origin.toUpperCase(),
    destinationLocationCode: params.destination.toUpperCase(),
    departureDate: params.departureDate,
    adults: String(params.adults ?? 1),
    currencyCode: "USD",
    max: "8",
    nonStop: "false",
  };

  if (params.returnDate) {
    query.returnDate = params.returnDate;
  }

  const data = await amadeusFetch<{
    data?: Array<{
      id: string;
      price: { total: string; currency: string };
      numberOfBookableSeats?: number;
      itineraries: Array<{
        duration: string;
        segments: Array<{
          departure: { iataCode: string; at: string };
          arrival: { iataCode: string; at: string };
          carrierCode: string;
          number: string;
        }>;
      }>;
    }>;
    dictionaries?: {
      carriers?: Record<string, string>;
    };
  }>("/v2/shopping/flight-offers", query);

  const carriers = data.dictionaries?.carriers ?? {};

  return (data.data ?? []).map((offer) => {
    const itinerary = offer.itineraries[0];
    const segments = itinerary.segments;
    const first = segments[0];
    const last = segments[segments.length - 1];
    const airlineCode = first.carrierCode;
    const stops = segments.length - 1;

    return {
      id: offer.id,
      airline: carriers[airlineCode] ?? airlineCode,
      airlineCode,
      departure: new Date(first.departure.at).toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      arrival: new Date(last.arrival.at).toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      origin: first.departure.iataCode,
      destination: last.arrival.iataCode,
      duration: formatDuration(itinerary.duration),
      stops,
      price: offer.price.total,
      currency: offer.price.currency,
      seats: offer.numberOfBookableSeats ?? 0,
      bookingUrl: `https://www.google.com/travel/flights?q=Flights%20from%20${first.departure.iataCode}%20to%20${last.arrival.iataCode}%20on%20${params.departureDate}`,
    };
  });
}

export async function searchHotels(params: {
  cityCode: string;
  checkIn: string;
  checkOut: string;
  adults?: number;
}): Promise<HotelOffer[]> {
  const city = params.cityCode.toUpperCase();

  const hotelsData = await amadeusFetch<{
    data?: Array<{ hotelId: string; name?: string }>;
  }>("/v1/reference-data/locations/hotels/by-city", {
    cityCode: city,
  });

  const hotelIds = (hotelsData.data ?? [])
    .slice(0, 12)
    .map((h) => h.hotelId)
    .filter(Boolean);

  if (hotelIds.length === 0) return [];

  const offersData = await amadeusFetch<{
    data?: Array<{
      hotel: {
        hotelId: string;
        name: string;
        cityCode?: string;
        rating?: string;
        address?: { lines?: string[] };
      };
      offers?: Array<{
        id: string;
        price: { total: string; currency: string };
      }>;
    }>;
  }>("/v3/shopping/hotel-offers", {
    hotelIds: hotelIds.join(","),
    checkInDate: params.checkIn,
    checkOutDate: params.checkOut,
    adults: String(params.adults ?? 1),
    currency: "USD",
  });

  const results: HotelOffer[] = [];

  for (const item of offersData.data ?? []) {
    const offer = item.offers?.[0];
    if (!offer) continue;

    results.push({
      id: offer.id,
      name: item.hotel.name,
      city,
      rating: item.hotel.rating,
      price: offer.price.total,
      currency: offer.price.currency,
      checkIn: params.checkIn,
      checkOut: params.checkOut,
      address: item.hotel.address?.lines?.join(", "),
      bookingUrl: `https://www.google.com/travel/hotels/${city}`,
    });
  }

  return results.slice(0, 6);
}
