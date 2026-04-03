"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navLinks = [
  { href: "#skills",       label: "skills" },
  { href: "#timeline",     label: "experience" },
  { href: "#projects",     label: "projects" },
  { href: "#achievements", label: "achievements" },
  { href: "#contact",      label: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 62,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(1.25rem, 5vw, 3rem)",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        background: scrolled
          ? "rgba(7, 12, 24, 0.88)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
      }}
    >
      {/* Logo */}
      <a
        href="#hero"
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 13,
          color: "var(--emerald)",
          textDecoration: "none",
          letterSpacing: "0.08em",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        sw.ml
        <span
          style={{
            display: "inline-block",
            width: "0.5em",
            height: 2,
            background: "var(--emerald)",
            marginLeft: 2,
            verticalAlign: "-0.1em",
            animation: "blink 1.1s step-end infinite",
          }}
        />
      </a>

      {/* Desktop links */}
      <ul
        style={{
          display: "flex",
          gap: "2rem",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
        className="hidden sm:flex"
      >
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "11.5px",
                color: "var(--text-secondary)",
                textDecoration: "none",
                letterSpacing: "0.07em",
                transition: "color 200ms",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLAnchorElement).style.color = "var(--blue)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLAnchorElement).style.color = "var(--text-secondary)")
              }
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <ThemeToggle />

        {/* Hamburger for mobile */}
        <button
          className="sm:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          style={{
            background: "none",
            border: "none",
            color: "var(--text-secondary)",
            cursor: "pointer",
            fontSize: 20,
            lineHeight: 1,
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="sm:hidden"
          style={{
            position: "absolute",
            top: 62,
            left: 0,
            right: 0,
            background: "rgba(7, 12, 24, 0.96)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid var(--border)",
            padding: "1rem clamp(1.25rem, 5vw, 3rem)",
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 13,
                color: "var(--text-secondary)",
                textDecoration: "none",
                letterSpacing: "0.07em",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
