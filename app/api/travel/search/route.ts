import { NextRequest, NextResponse } from "next/server";
import { runTravelSearch } from "@/lib/travel-search";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const origin = String(body.origin ?? "").trim();
    const destination = String(body.destination ?? "").trim();
    const departureDate = String(body.departureDate ?? "").trim();
    const returnDate = body.returnDate
      ? String(body.returnDate).trim()
      : undefined;
    const adults = Number(body.adults) || 1;
    const cityCode = body.cityCode
      ? String(body.cityCode).trim()
      : destination;
    const preferences = body.preferences
      ? String(body.preferences).trim()
      : undefined;

    if (!origin || origin.length !== 3) {
      return NextResponse.json(
        { error: "Origin must be a 3-letter IATA code (e.g. NYC, MAD)" },
        { status: 400 }
      );
    }
    if (!destination || destination.length !== 3) {
      return NextResponse.json(
        { error: "Destination must be a 3-letter IATA code (e.g. PAR, BCN)" },
        { status: 400 }
      );
    }
    if (!departureDate || !/^\d{4}-\d{2}-\d{2}$/.test(departureDate)) {
      return NextResponse.json(
        { error: "Departure date required (YYYY-MM-DD)" },
        { status: 400 }
      );
    }

    const result = await runTravelSearch({
      origin,
      destination,
      departureDate,
      returnDate,
      adults,
      cityCode,
      preferences,
    });

    return NextResponse.json(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Search failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
