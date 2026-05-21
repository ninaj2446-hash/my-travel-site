"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Bot, User } from "lucide-react";
import FlightCard from "./FlightCard";
import HotelCard from "./HotelCard";
import type { ChatMessage, FlightOffer, HotelOffer } from "@/lib/types/travel";

const STARTER: ChatMessage = {
  role: "assistant",
  content:
    "Welcome to Voyanté Concierge. I compose luxury trips instantly—flights, hotels, budgets, and day-by-day plans.\n\nTry:\n• \"Plan MAD to PAR on 2025-11-08\"\n• \"What's the budget for London?\"\n• \"Insider tips for Barcelona\"",
};

export default function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([STARTER]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState<FlightOffer[]>([]);
  const [hotels, setHotels] = useState<HotelOffer[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, flights, hotels]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = { role: "user", content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Request failed");

      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply },
      ]);
      if (data.flights?.length) setFlights(data.flights);
      if (data.hotels?.length) setHotels(data.hotels);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            err instanceof Error
              ? err.message
              : "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <div className="glass-card flex h-[min(70vh,640px)] flex-col rounded-3xl">
          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    msg.role === "user"
                      ? "bg-forest text-cream"
                      : "bg-gold/20 text-gold-muted"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-forest-deep text-cream"
                      : "bg-white/60 text-charcoal"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-sm text-charcoal-muted">
                <Loader2 className="h-4 w-4 animate-spin" />
                Composing your plan…
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={send}
            className="flex gap-2 border-t border-forest/10 p-4"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask or search: MAD to BCN on 2025-09-15"
              className="flex-1 rounded-full border border-forest/15 bg-white/80 px-5 py-3 text-sm outline-none focus:border-gold/50"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-deep text-cream transition-colors hover:bg-forest-mid disabled:opacity-50"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      <div className="space-y-6 lg:col-span-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-muted">
          Your selections
        </p>
        {flights.length === 0 && hotels.length === 0 && (
          <p className="text-sm text-charcoal-muted">
            Ask for a route with IATA codes and date — e.g. &quot;Plan MAD to PAR
            on 2025-11-08&quot; — to see flights and hotels here.
          </p>
        )}
        {flights.slice(0, 2).map((f) => (
          <FlightCard key={f.id} flight={f} />
        ))}
        {hotels.slice(0, 2).map((h) => (
          <HotelCard key={h.id} hotel={h} />
        ))}
      </div>
    </div>
  );
}
