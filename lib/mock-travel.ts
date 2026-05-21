import type {
  AirportSuggestion,
  FlightOffer,
  HotelOffer,
  TravelSearchRequest,
  TravelSearchResult,
  TripBudget,
  ChatMessage,
} from "@/lib/types/travel";

const CITIES: Record<string, { city: string; country: string; name: string }> = {
  NYC: { city: "New York", country: "United States", name: "JFK International" },
  LON: { city: "London", country: "United Kingdom", name: "Heathrow" },
  PAR: { city: "Paris", country: "France", name: "Charles de Gaulle" },
  MAD: { city: "Madrid", country: "Spain", name: "Adolfo Suárez Madrid–Barajas" },
  BCN: { city: "Barcelona", country: "Spain", name: "El Prat" },
  ROM: { city: "Rome", country: "Italy", name: "Fiumicino" },
  DXB: { city: "Dubai", country: "UAE", name: "Dubai International" },
  TYO: { city: "Tokyo", country: "Japan", name: "Haneda" },
  SYD: { city: "Sydney", country: "Australia", name: "Kingsford Smith" },
  MIA: { city: "Miami", country: "United States", name: "Miami International" },
  MIL: { city: "Milan", country: "Italy", name: "Malpensa" },
  ZRH: { city: "Zurich", country: "Switzerland", name: "Zurich Airport" },
};

const AIRPORT_INDEX: AirportSuggestion[] = Object.entries(CITIES).map(
  ([iata, c]) => ({
    iata,
    name: c.name,
    city: c.city,
    country: c.country,
  })
);

export function mockSearchAirports(keyword: string): AirportSuggestion[] {
  const q = keyword.toUpperCase().trim();
  return AIRPORT_INDEX.filter(
    (a) =>
      a.iata.includes(q) ||
      a.city.toUpperCase().includes(q) ||
      a.name.toUpperCase().includes(q) ||
      a.country.toUpperCase().includes(q)
  ).slice(0, 8);
}

function cityLabel(code: string) {
  return CITIES[code]?.city ?? code;
}

function formatDisplayDate(iso: string, hour: number, minute: number) {
  const d = new Date(iso + "T12:00:00");
  d.setHours(hour, minute, 0, 0);
  return d.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function addDays(iso: string, days: number) {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function generateMockTravelSearch(
  req: TravelSearchRequest
): TravelSearchResult {
  const origin = req.origin.toUpperCase().trim();
  const destination = req.destination.toUpperCase().trim();
  const adults = req.adults ?? 1;
  const returnDate = req.returnDate;
  const checkOut = returnDate ?? addDays(req.departureDate, 4);
  const originCity = cityLabel(origin);
  const destCity = cityLabel(destination);

  const flights = buildFlights(
    origin,
    destination,
    req.departureDate,
    returnDate,
    adults
  );
  const hotels = buildHotels(destination, destCity, req.departureDate, checkOut);
  const budget = buildBudget(flights, hotels, adults, returnDate);
  const itinerary = buildItinerary({
    origin,
    destination,
    originCity,
    destCity,
    departureDate: req.departureDate,
    returnDate,
    adults,
    preferences: req.preferences,
    flights,
    hotels,
    budget,
  });

  return {
    flights,
    hotels,
    itinerary,
    budget,
    meta: {
      origin,
      destination,
      departureDate: req.departureDate,
      returnDate,
      originCity,
      destinationCity: destCity,
    },
  };
}

function buildFlights(
  origin: string,
  destination: string,
  departureDate: string,
  returnDate: string | undefined,
  adults: number
): FlightOffer[] {
  const outbound: FlightOffer[] = [
    {
      id: "fl-1",
      airline: "Emirates",
      airlineCode: "EK",
      departure: formatDisplayDate(departureDate, 9, 40),
      arrival: formatDisplayDate(departureDate, 14, 15),
      origin,
      destination,
      duration: "4h 35m",
      stops: 0,
      price: String(1240 * adults),
      currency: "USD",
      seats: 4,
      cabin: "Business",
      bookingUrl: "#",
    },
    {
      id: "fl-2",
      airline: "Singapore Airlines",
      airlineCode: "SQ",
      departure: formatDisplayDate(departureDate, 18, 20),
      arrival: formatDisplayDate(departureDate, 23, 5),
      origin,
      destination,
      duration: "4h 45m",
      stops: 0,
      price: String(980 * adults),
      currency: "USD",
      seats: 7,
      cabin: "Premium Economy",
      bookingUrl: "#",
    },
    {
      id: "fl-3",
      airline: "British Airways",
      airlineCode: "BA",
      departure: formatDisplayDate(departureDate, 11, 10),
      arrival: formatDisplayDate(departureDate, 17, 50),
      origin,
      destination,
      duration: "6h 40m",
      stops: 1,
      price: String(720 * adults),
      currency: "USD",
      seats: 12,
      cabin: "Economy Flex",
      bookingUrl: "#",
    },
  ];

  if (!returnDate) return outbound;

  const inbound: FlightOffer[] = [
    {
      id: "fl-r1",
      airline: "Emirates",
      airlineCode: "EK",
      departure: formatDisplayDate(returnDate, 16, 0),
      arrival: formatDisplayDate(returnDate, 20, 25),
      origin: destination,
      destination: origin,
      duration: "4h 25m",
      stops: 0,
      price: String(1180 * adults),
      currency: "USD",
      seats: 6,
      cabin: "Business",
      bookingUrl: "#",
    },
    {
      id: "fl-r2",
      airline: "Lufthansa",
      airlineCode: "LH",
      departure: formatDisplayDate(returnDate, 10, 30),
      arrival: formatDisplayDate(returnDate, 16, 10),
      origin: destination,
      destination: origin,
      duration: "5h 40m",
      stops: 1,
      price: String(690 * adults),
      currency: "USD",
      seats: 9,
      cabin: "Economy",
      bookingUrl: "#",
    },
  ];

  return [...outbound, ...inbound];
}

function buildHotels(
  cityCode: string,
  cityName: string,
  checkIn: string,
  checkOut: string
): HotelOffer[] {
  const presets: Record<string, { name: string; rating: string; price: string; address: string }[]> = {
    PAR: [
      { name: "Ritz Paris", rating: "5", price: "2840", address: "15 Place Vendôme" },
      { name: "Le Bristol Paris", rating: "5", price: "1950", address: "112 Rue du Faubourg Saint-Honoré" },
      { name: "Hôtel de Crillon", rating: "5", price: "1680", address: "10 Place de la Concorde" },
    ],
    LON: [
      { name: "Claridge's", rating: "5", price: "2120", address: "Brook Street, Mayfair" },
      { name: "The Savoy", rating: "5", price: "1780", address: "Strand, London" },
      { name: "Corinthia London", rating: "5", price: "1540", address: "Whitehall Place" },
    ],
    NYC: [
      { name: "The Plaza", rating: "5", price: "2450", address: "Fifth Avenue at Central Park South" },
      { name: "The Mark", rating: "5", price: "1890", address: "Madison Avenue" },
      { name: "Mandarin Oriental New York", rating: "5", price: "1650", address: "Columbus Circle" },
    ],
    default: [
      { name: `Grand Voyanté ${cityName}`, rating: "5", price: "1420", address: `Historic centre, ${cityName}` },
      { name: `The ${cityName} Edition`, rating: "5", price: "1180", address: `Waterfront district` },
      { name: `Palazzo ${cityName}`, rating: "5", price: "980", address: `Cultural quarter` },
    ],
  };

  const list = presets[cityCode] ?? presets.default;

  return list.map((h, i) => ({
    id: `ht-${cityCode}-${i}`,
    name: h.name,
    city: cityName,
    rating: h.rating,
    price: h.price,
    currency: "USD",
    checkIn,
    checkOut,
    address: h.address,
    bookingUrl: "#",
  }));
}

function buildBudget(
  flights: FlightOffer[],
  hotels: HotelOffer[],
  adults: number,
  hasReturn: string | undefined
): TripBudget {
  const flightTotal = flights.reduce((s, f) => s + Number(f.price), 0);
  const hotelTotal = hotels.reduce((s, h) => s + Number(h.price), 0);
  const experiences = Math.round(420 * adults * (hasReturn ? 1.6 : 1));
  const dining = Math.round(380 * adults * (hasReturn ? 1.5 : 1));
  const transfers = Math.round(180 * adults);
  const concierge = 250;
  const total = flightTotal + hotelTotal + experiences + dining + transfers + concierge;

  return {
    currency: "USD",
    total,
    perPerson: Math.round(total / adults),
    tier: "Voyanté Signature Luxury",
    lines: [
      { label: "Flights (selected cabin)", amount: flightTotal, note: `${flights.length} segments` },
      { label: "Hotels (5-star collection)", amount: hotelTotal, note: `${hotels.length} properties quoted` },
      { label: "Private experiences", amount: experiences, note: "Museums, guides, yacht day optional" },
      { label: "Fine dining reserve", amount: dining, note: "3 chef's tables included in plan" },
      { label: "Chauffeur & transfers", amount: transfers },
      { label: "AI concierge & insurance", amount: concierge },
    ],
    insight:
      "Budget optimized for minimal transit time and maximum cultural immersion. Swap Business for Premium Economy to reduce total by ~18%.",
  };
}

function buildItinerary(ctx: {
  origin: string;
  destination: string;
  originCity: string;
  destCity: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  preferences?: string;
  flights: FlightOffer[];
  hotels: HotelOffer[];
  budget: TripBudget;
}): string {
  const topFlight = ctx.flights[0];
  const topHotel = ctx.hotels[0];
  const days = ctx.returnDate ? "multi-day" : "extended";
  const pref = ctx.preferences || "luxury, culture, fine dining";

  return `**Voyanté Signature Itinerary**
${ctx.originCity} (${ctx.origin}) → ${ctx.destCity} (${ctx.destination})
${ctx.departureDate}${ctx.returnDate ? ` — return ${ctx.returnDate}` : ""} · ${ctx.adults} traveler(s) · ${pref}

---

**Day 1 — Arrival & first impressions**
• ${topFlight.airline} ${topFlight.cabin ?? "Premium"} · dep. ${topFlight.departure}
• Private transfer to **${topHotel.name}** (${topHotel.address})
• Sunset aperitif; early night for jet-lag recovery

**Day 2 — Culture at your pace**
• 09:00 — Private curator-led museum tour (before public hours)
• 13:00 — Lunch at a reservations-only address in the old quarter
• 19:30 — Chef's table (${ctx.destCity} culinary scene)

**Day 3 — Hidden ${ctx.destCity}**
• Morning: AI-selected "local secret" neighbourhood walk
• Afternoon: spa or atelier visit aligned with your taste profile
• Evening: jazz cellar or rooftop — venue confirmed 24h prior

${ctx.returnDate ? `**Day 4 — Leisure & departure**
• Late checkout arranged · boutique shopping with stylist brief
• Return flight ${ctx.flights.find((f) => f.origin === ctx.destination)?.departure ?? "scheduled per selection"}` : `**Day 4+ — Continue**
• Voyanté will extend with island, wine country, or atelier circuit on request.`}

---

**Investment overview:** ${ctx.budget.currency} ${ctx.budget.total.toLocaleString()} total (${ctx.budget.perPerson.toLocaleString()} per person)
Tier: *${ctx.budget.tier}*

*Itinerary composed by Voyanté Intelligence — flights, hotels, and budget synchronized to your selections.*`;
}

export function generateMockAssistantReply(
  messages: ChatMessage[],
  searchResult?: TravelSearchResult | null
): string {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const text = (lastUser?.content ?? "").toLowerCase();

  if (searchResult) {
    const { meta, flights, hotels, budget } = searchResult;
    return `I've composed a complete luxury plan for **${meta.originCity ?? meta.origin} → ${meta.destinationCity ?? meta.destination}** (${meta.departureDate}).

**Recommended flight:** ${flights[0]?.airline} — ${flights[0]?.currency} ${flights[0]?.price} (${flights[0]?.cabin ?? "Premium"})

**Recommended stay:** ${hotels[0]?.name} — ${hotels[0]?.currency} ${hotels[0]?.price} for your dates

**Total journey budget:** ${budget?.currency} ${budget?.total.toLocaleString()} (*${budget?.tier}*)

Open the **Travel Generator** to see the full day-by-day itinerary, all flight options, and hotel alternatives. Shall I refine for more culture, wellness, or nightlife?`;
  }

  if (/budget|бюджет|price|стоимость|cost/.test(text)) {
    return `For a signature Voyanté journey, we typically allocate 35–40% to flights (Business or Premium), 30% to five-star stays, and the remainder to private experiences, dining, and concierge.

Share origin, destination, and dates (e.g. *PAR to NYC on 2025-10-12*) and I'll produce a precise breakdown instantly.`;
  }

  if (/hotel|отель|stay|room/.test(text)) {
    return `Our hotel layer prioritizes heritage palaces and design-led icons—Ritz, Bristol, Claridge's calibre—always with flexible cancellation where possible.

Tell me your destination code and check-in date; I'll surface three curated properties with live-style pricing.`;
  }

  if (/flight|рейс|fly|ticket|самолет|plane/.test(text)) {
    return `I can surface nonstop and one-stop options across major carriers—Emirates, Singapore Airlines, BA—with cabin recommendations matched to your route length.

Example: *Search MAD to PAR on 2025-09-20* — I'll return Business, Premium, and Flex economy tiers.`;
  }

  if (/tip|advice|insider|совет|hidden/.test(text)) {
    return `Three Voyanté principles for ${text.includes("paris") || text.includes("par") ? "Paris" : "any capital"}:

1. **Reserve mornings** for institutions—crowds peak after 11:00.
2. **Book dining 72h ahead** for Michelin-tier rooms; we hold waitlist fallbacks.
3. **One neighborhood per day**—the algorithm penalizes cross-city transits for a reason.

Want a full generated plan? Use the generator or paste a route with date.`;
  }

  return `Good day. I'm your Voyanté concierge—ready to build a complete luxury itinerary with flights, hotels, and a transparent budget in seconds.

**Try asking:**
• "Plan MAD to PAR on 2025-11-08"
• "What's the budget for 2 travelers to London?"
• "Best five-star area in Barcelona"

Or visit **Travel Generator** for the full visual experience.`;
}
