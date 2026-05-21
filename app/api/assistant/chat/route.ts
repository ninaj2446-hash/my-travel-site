import { NextRequest, NextResponse } from "next/server";
import { generateMockAssistantReply } from "@/lib/mock-travel";
import { runTravelSearch } from "@/lib/travel-search";
import type { ChatMessage } from "@/lib/types/travel";

type ChatBody = {
  messages: ChatMessage[];
  searchParams?: {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
    adults?: number;
  };
};

const IATA_RE = /\b([A-Z]{3})\s*(?:→|->|to|-)\s*([A-Z]{3})\b/i;
const DATE_RE = /\b(20\d{2}-\d{2}-\d{2})\b/;

function extractSearchFromMessage(text: string) {
  const iata = text.toUpperCase().match(IATA_RE);
  const date = text.match(DATE_RE);
  if (iata && date) {
    return {
      origin: iata[1],
      destination: iata[2],
      departureDate: date[1],
    };
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ChatBody;
    const messages = body.messages ?? [];

    if (messages.length === 0) {
      return NextResponse.json({ error: "No messages" }, { status: 400 });
    }

    const explicitSearch = body.searchParams;
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    const parsed =
      explicitSearch ??
      (lastUser ? extractSearchFromMessage(lastUser.content) : null);

    const wantsSearch =
      parsed &&
      (explicitSearch ||
        /flight|hotel|book|search|find|price|plan|ticket|маршрут|рейс|отель|билет|найди|спланиру/i.test(
          lastUser?.content ?? ""
        ));

    let searchResult = null;
    if (wantsSearch && parsed) {
      searchResult = await runTravelSearch({
        origin: parsed.origin,
        destination: parsed.destination,
        departureDate: parsed.departureDate,
        returnDate:
          "returnDate" in parsed
            ? (parsed as { returnDate?: string }).returnDate
            : undefined,
        adults: explicitSearch?.adults ?? 1,
      });
    }

    const reply = generateMockAssistantReply(messages, searchResult);

    return NextResponse.json({
      reply,
      flights: searchResult?.flights ?? [],
      hotels: searchResult?.hotels ?? [],
      budget: searchResult?.budget,
      search: searchResult?.meta,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Chat failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
