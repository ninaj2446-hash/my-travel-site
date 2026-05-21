"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/navigation";

type Lang = "EN" | "RU";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(!isHome);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("EN");

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navTextClass = scrolled
    ? "text-cream/80 hover:text-gold"
    : "text-cream/80 hover:text-gold";

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-nav shadow-glass py-3" : "bg-transparent py-5 md:py-6"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link
            href="/"
            className="font-serif text-xl tracking-[0.2em] text-cream md:text-2xl"
          >
            VOYANTÉ
          </Link>

          <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-[10px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 xl:text-[11px] xl:tracking-[0.22em] ${navTextClass} ${
                      active ? "!text-gold" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4 md:gap-6">
            <div
              className="hidden items-center rounded-full border border-cream/20 bg-white/5 p-0.5 backdrop-blur-sm sm:flex"
              role="group"
              aria-label="Language"
            >
              {(["EN", "RU"] as Lang[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={`rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest transition-all duration-300 ${
                    lang === code
                      ? "bg-gold/90 text-forest-deep shadow-gold-glow-sm"
                      : "text-cream/60 hover:text-cream"
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-forest-deep/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-serif text-xl tracking-[0.2em] text-cream">
                VOYANTÉ
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="text-cream"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <ul className="flex flex-col gap-6 px-8 pt-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`font-serif text-2xl ${
                      pathname === link.href ? "text-gold" : "text-cream"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 flex justify-center gap-2 px-6">
              {(["EN", "RU"] as Lang[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={`rounded-full px-4 py-2 text-xs uppercase tracking-widest ${
                    lang === code ? "bg-gold text-forest-deep" : "text-cream/60"
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
