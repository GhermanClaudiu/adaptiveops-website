"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type NavChild = { href: string; label: string; tint?: string; dot?: string };
type NavItem =
  | { href: string; label: string; external?: boolean }
  | { label: string; children: NavChild[] };

const navLinks: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/academy", label: "Academy" },
  { href: "/lean-office", label: "Lean in the Office" },
  { href: "/about", label: "About" },
  {
    label: "Resources",
    children: [
      { href: "/resources/tools", label: "Tools", tint: "bg-accent/20 border-accent/40 hover:bg-accent/30", dot: "bg-accent" },
      { href: "/resources/workshops", label: "Workshops", tint: "bg-secondary/20 border-secondary/40 hover:bg-secondary/30", dot: "bg-secondary" },
      { href: "/resources/downloads", label: "Downloads", tint: "bg-white/10 border-white/25 hover:bg-white/20", dot: "bg-mid" },
      { href: "/blog", label: "Blog", tint: "bg-white/10 border-white/25 hover:bg-white/20", dot: "bg-mid" },
    ],
  },
  { href: "/before-you-call", label: "Before You Call" },
];

function isGroup(item: NavItem): item is { label: string; children: NavChild[] } {
  return "children" in item;
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function openDropdown(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(label);
  }

  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setDropdownOpen(null), 120);
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-primary text-white transition-shadow ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <nav className="w-full px-4 sm:px-6 lg:px-10 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <div className="leading-none">
            <span className="text-xl font-bold text-white" style={{ letterSpacing: "-0.5px" }}>Adaptive</span>
            <span className="text-xl font-light text-accent" style={{ letterSpacing: "-0.5px" }}>Ops</span>
          </div>
          <span className="hidden md:block text-[9px] font-semibold uppercase text-accent" style={{ letterSpacing: "3px" }}>
            Operational Excellence
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            if (isGroup(link)) {
              const open = dropdownOpen === link.label;
              return (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => openDropdown(link.label)}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/80 hover:text-white rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                    aria-haspopup="true"
                    aria-expanded={open}
                    onClick={() => setDropdownOpen(open ? null : link.label)}
                  >
                    {link.label}
                    <svg
                      className={`w-3.5 h-3.5 opacity-70 transition-transform ${open ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                  {open && (
                    <ul className="absolute left-0 top-full pt-2 min-w-[200px]">
                      <div className="bg-white border border-gray-200 rounded-lg shadow-xl py-1.5 overflow-hidden">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-primary hover:bg-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
                              onClick={() => setDropdownOpen(null)}
                            >
                              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${child.dot ?? "bg-mid"}`} aria-hidden="true" />
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </div>
                    </ul>
                  )}
                </li>
              );
            }
            return link.external ? (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/80 hover:text-white rounded-md transition-colors"
                >
                  {link.label}
                  <svg
                    className="w-3 h-3 opacity-60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-white/80 hover:text-white rounded-md transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className="ml-3">
            <Link
              href="/contact"
              className="inline-block bg-accent hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
            >
              Get in touch
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-md text-white/80 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-primary">
          <ul className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              if (isGroup(link)) {
                return (
                  <li key={link.label} className="pt-1">
                    <p className="px-3 pt-2 pb-2 text-[11px] font-bold uppercase tracking-widest text-white/40">
                      {link.label}
                    </p>
                    <div className="px-3 flex flex-wrap gap-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold text-white border transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary ${
                            child.tint ?? "bg-white/10 border-white/20 hover:bg-white/20"
                          }`}
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </li>
                );
              }
              return link.external ? (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>{link.label}</span>
                    <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                </li>
              ) : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <Link
                href="/contact"
                className="block text-center bg-accent hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Get in touch
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
