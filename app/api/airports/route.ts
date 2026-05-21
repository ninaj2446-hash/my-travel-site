import { NextRequest, NextResponse } from "next/server";
import { mockSearchAirports } from "@/lib/mock-travel";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (q.length < 2) {
    return NextResponse.json({ suggestions: [] });
  }

  const suggestions = mockSearchAirports(q);
  return NextResponse.json({ suggestions });
}
