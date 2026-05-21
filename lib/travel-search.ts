import { generateMockTravelSearch } from "@/lib/mock-travel";
import type { TravelSearchRequest, TravelSearchResult } from "@/lib/types/travel";

export async function runTravelSearch(
  req: TravelSearchRequest
): Promise<TravelSearchResult> {
  const origin = req.origin.toUpperCase().trim();
  const destination = req.destination.toUpperCase().trim();

  return generateMockTravelSearch({
    ...req,
    origin,
    destination,
    cityCode: (req.cityCode ?? destination).toUpperCase(),
  });
}
