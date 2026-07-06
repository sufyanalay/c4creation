"use client";

import { useState } from "react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Embroidery", href: "#embroidery" },
  { label: "Apparels", href: "#apparels" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        {/* Logo */}
        <a
          href="#home"
          className="font-serif text-2xl font-bold text-cream"
        >
          C4 <span className="text-gold">Creation</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-cream/75 transition hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Button */}
        <a
          href="#contact"
          className="hidden rounded-full border border-gold px-5 py-2 text-sm font-semibold text-gold transition hover:bg-gold hover:text-ink md:inline-block"
        >
          Get a Quote
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="text-cream md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          <div className="space-y-1.5">
            <span className="block h-0.5 w-6 bg-cream"></span>
            <span className="block h-0.5 w-6 bg-cream"></span>
            <span className="block h-0.5 w-6 bg-cream"></span>
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <ul className="space-y-1 border-t border-white/10 bg-ink px-5 py-3 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm font-medium text-cream/75 hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}