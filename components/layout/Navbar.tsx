"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navLinks = [
  { label: "skills",       index: 1 },
  { label: "experience",   index: 2 },
  { label: "projects",     index: 3 },
  { label: "achievements", index: 4 },
  { label: "blog",         index: 5 },
  { label: "contact",      index: 6 },
];

function goToSlide(index: number) {
  window.dispatchEvent(
    new CustomEvent("fullpage:goto", { detail: { index } })
  );
}

export default function Navbar() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handle = (e: Event) => {
      setCurrentSlide((e as CustomEvent<{ index: number }>).detail.index);
    };
    window.addEventListener("fullpage:change", handle);
    return () => window.removeEventListener("fullpage:change", handle);
  }, []);

  const scrolled = currentSlide > 0;

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
        background: scrolled ? "rgba(7, 12, 24, 0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
      }}
    >
      {/* Logo — click returns to hero */}
      <button
        onClick={() => goToSlide(0)}
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 13,
          color: "var(--emerald)",
          letterSpacing: "0.08em",
          display: "flex",
          alignItems: "center",
          gap: 2,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
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
      </button>

      {/* Desktop links */}
      <ul
        style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}
        className="hidden sm:flex"
      >
        {navLinks.map((link) => {
          const isActive = currentSlide === link.index;
          return (
            <li key={link.label}>
              <button
                onClick={() => goToSlide(link.index)}
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "11.5px",
                  color: isActive ? "var(--blue)" : "var(--text-secondary)",
                  letterSpacing: "0.07em",
                  transition: "color 200ms",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--blue)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = isActive
                    ? "var(--blue)"
                    : "var(--text-secondary)";
                }}
              >
                {link.label}
              </button>
            </li>
          );
        })}
      </ul>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <ThemeToggle />

        {/* Hamburger — mobile */}
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

      {/* Mobile dropdown */}
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
            <button
              key={link.label}
              onClick={() => {
                setMenuOpen(false);
                goToSlide(link.index);
              }}
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 13,
                color: "var(--text-secondary)",
                letterSpacing: "0.07em",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                textAlign: "left",
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
