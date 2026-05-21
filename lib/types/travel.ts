export type AirportSuggestion = {
  iata: string;
  name: string;
  city: string;
  country: string;
};

export type FlightOffer = {
  id: string;
  airline: string;
  airlineCode: string;
  departure: string;
  arrival: string;
  origin: string;
  destination: string;
  duration: string;
  stops: number;
  price: string;
  currency: string;
  seats: number;
  cabin?: string;
  bookingUrl?: string;
};

export type HotelOffer = {
  id: string;
  name: string;
  city: string;
  rating?: string;
  price: string;
  currency: string;
  checkIn: string;
  checkOut: string;
  address?: string;
  bookingUrl?: string;
};

export type BudgetLine = {
  label: string;
  amount: number;
  note?: string;
};

export type TripBudget = {
  currency: string;
  total: number;
  perPerson: number;
  tier: string;
  lines: BudgetLine[];
  insight: string;
};

export type TravelSearchRequest = {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults?: number;
  cityCode?: string;
  preferences?: string;
};

export type TravelSearchResult = {
  flights: FlightOffer[];
  hotels: HotelOffer[];
  itinerary?: string;
  budget?: TripBudget;
  meta: {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
    originCity?: string;
    destinationCity?: string;
  };
};

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};
