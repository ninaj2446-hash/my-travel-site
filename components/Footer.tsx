"use client";

import Link from "next/link";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import { footerNav } from "@/lib/navigation";

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal px-6 py-16 md:px-10 md:py-20 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-serif text-2xl tracking-[0.18em] text-cream"
            >
              VOYANTÉ
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/50">
              The definitive AI travel atelier—where algorithmic precision
              meets the quiet luxury of journeys designed entirely for you.
            </p>
            <div className="mt-8 flex gap-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-cream/60 transition-all duration-300 hover:border-gold/40 hover:text-gold"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerNav).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold/70">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/50 transition-colors duration-300 hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-10 md:flex-row">
          <p className="text-xs text-cream/35">
            © {new Date().getFullYear()} Voyanté. All rights reserved.
          </p>
          <p className="text-center font-serif text-sm italic text-cream/40 md:text-right">
            Travel, distilled to its most beautiful form.
          </p>
        </div>
      </div>
    </footer>
  );
}
