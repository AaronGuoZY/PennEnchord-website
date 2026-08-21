"use client";

import Link from "next/link";
import type { TouchEvent } from "react";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/concerts", label: "Concerts" },
  { href: "/members/spring-2026", label: "Members" },
  { href: "/live", label: "Live" },
  { href: "/tickets", label: "Tickets" },
  { href: "/audition", label: "Audition" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen((prev) => !prev);
  const handleTouchStart = (event: TouchEvent<HTMLButtonElement>) => {
    // iOS Safari can miss click events on layered/sticky UI;
    // use touchstart and suppress the synthetic click.
    event.preventDefault();
    toggleMenu();
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-[100] isolate">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="font-bold text-xl tracking-tight text-white">
          PennEnchord
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex gap-6 text-xl font-medium">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden min-h-11 min-w-11 p-2 cursor-pointer touch-manipulation relative z-[110] pointer-events-auto select-none"
          onClick={toggleMenu}
          onTouchStart={handleTouchStart}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-nav-menu"
        >
          <span className="block w-5 h-0.5 bg-gray-300 mb-1" />
          <span className="block w-5 h-0.5 bg-gray-300 mb-1" />
          <span className="block w-5 h-0.5 bg-gray-300" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-nav-menu"
          className="md:hidden fixed top-16 left-0 right-0 border-t border-gray-800 px-4 py-3 flex flex-col gap-3 text-sm font-medium bg-gray-900 z-[100]"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
