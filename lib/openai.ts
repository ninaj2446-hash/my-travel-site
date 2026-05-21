import type { ChatMessage, FlightOffer, HotelOffer } from "@/lib/types/travel";

export function isOpenAIConfigured() {
  return Boolean(process.env.OPENAI_API_KEY);
}

export async function generateItinerary(params: {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  flights: FlightOffer[];
  hotels: HotelOffer[];
  preferences?: string;
}): Promise<string> {
  if (!isOpenAIConfigured()) {
    return buildFallbackItinerary(params);
  }

  const flightSummary =
    params.flights.length > 0
      ? params.flights
          .slice(0, 3)
          .map(
            (f) =>
              `${f.airline} ${f.origin}→${f.destination} ${f.price} ${f.currency}, dep ${f.departure}`
          )
          .join("\n")
      : "No live flight offers returned for these dates (try MAD→BCN or NYC→LON in test mode).";

  const hotelSummary =
    params.hotels.length > 0
      ? params.hotels
          .slice(0, 3)
          .map((h) => `${h.name} from ${h.price} ${h.currency}/stay`)
          .join("\n")
      : "No live hotel offers returned for these dates.";

  const system = `You are Voyanté, a luxury AI travel concierge. Write a concise, elegant day-by-day itinerary in English using ONLY the real flight and hotel data provided. Include estimated daily budget tier (luxury). Be specific about flight times and hotel names when available. Keep under 400 words.`;

  const user = `Trip: ${params.origin} to ${params.destination}
Depart: ${params.departureDate}${params.returnDate ? `, return ${params.returnDate}` : ""}
Preferences: ${params.preferences || "luxury, culture, fine dining"}

Live flights:
${flightSummary}

Live hotels:
${hotelSummary}`;

  const text = await chatCompletion([
    { role: "system", content: system },
    { role: "user", content: user },
  ]);

  return text;
}

export async function assistantReply(params: {
  messages: ChatMessage[];
  travelContext?: {
    flights: FlightOffer[];
    hotels: HotelOffer[];
    search?: { origin: string; destination: string; departureDate: string };
  };
}): Promise<string> {
  if (!isOpenAIConfigured()) {
    return (
      "AI assistant requires OPENAI_API_KEY in .env.local. " +
      "Meanwhile, use the Travel Generator at /generator for live Amadeus flight and hotel search."
    );
  }

  let contextBlock = "";
  if (params.travelContext?.search) {
    const s = params.travelContext.search;
    contextBlock += `\nLast search: ${s.origin} → ${s.destination}, ${s.departureDate}`;
  }
  if (params.travelContext?.flights?.length) {
    contextBlock +=
      "\nFlights found:\n" +
      params.travelContext.flights
        .slice(0, 5)
        .map((f) => `- ${f.airline}: ${f.price} ${f.currency}`)
        .join("\n");
  }
  if (params.travelContext?.hotels?.length) {
    contextBlock +=
      "\nHotels found:\n" +
      params.travelContext.hotels
        .slice(0, 5)
        .map((h) => `- ${h.name}: ${h.price} ${h.currency}`)
        .join("\n");
  }

  const system = `You are Voyanté AI Concierge — calm, luxurious, expert travel advisor.
Help with itineraries, flights, hotels, budgets, and insider tips.
When live search data is provided below, reference real prices and names.
If user wants to book, suggest they use booking links on the generator page.
For new searches, ask for: origin IATA, destination IATA, departure date (YYYY-MM-DD), optional return date.
${contextBlock}`;

  return chatCompletion([
    { role: "system", content: system },
    ...params.messages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
  ]);
}

async function chatCompletion(
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>
): Promise<string> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.7,
      max_tokens: 900,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI error: ${err}`);
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  return (
    data.choices?.[0]?.message?.content?.trim() ??
    "I could not generate a response. Please try again."
  );
}

function buildFallbackItinerary(params: {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  flights: FlightOffer[];
  hotels: HotelOffer[];
}): string {
  const topFlight = params.flights[0];
  const topHotel = params.hotels[0];
  return `**Your Voyanté itinerary** (${params.origin} → ${params.destination})

**Day 1 — Arrival**
${topFlight ? `Fly ${topFlight.airline} (${topFlight.departure} – ${topFlight.arrival}). From ${topFlight.price} ${topFlight.currency}.` : "Search live flights on the generator."}
${topHotel ? `Stay at **${topHotel.name}** from ${topHotel.price} ${topHotel.currency}.` : "Browse live hotels below."}

**Days 2–3 — Culture & cuisine**
Morning: landmark district and private gallery visit.
Evening: chef's table reservation (concierge can confirm).

**Day 4 — Departure**
${params.returnDate ? `Return ${params.returnDate}.` : "Extend or return at your pace."}

*Add OPENAI_API_KEY for a fully AI-written day-by-day plan.*`;
}
