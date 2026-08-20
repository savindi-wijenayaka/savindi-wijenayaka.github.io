"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { SECTION_IDS } from "@/components/ui/FullpageScroll";

const navLinks = [
  { label: "skills",       index: 1 },
  { label: "experience",   index: 2 },
  { label: "projects",     index: 3 },
  { label: "achievements", index: 4 },
  { label: "blog",         index: 5, href: "/blog" },
  { label: "contact",      index: 6 },
];

const MOBILE_QUERY = "(max-width: 767px)";

function isMobileViewport() {
  return window.matchMedia(MOBILE_QUERY).matches;
}

function goToSlide(index: number) {
  if (isMobileViewport()) {
    document.getElementById(SECTION_IDS[index])?.scrollIntoView({ behavior: "smooth" });
    return;
  }
  window.dispatchEvent(
    new CustomEvent("fullpage:goto", { detail: { index } })
  );
}

export default function Navbar() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  function handleLogoClick() {
    if (pathname === "/") {
      goToSlide(0);
    } else {
      router.push("/");
    }
  }

  useEffect(() => {
    const handle = (e: Event) => {
      setCurrentSlide((e as CustomEvent<{ index: number }>).detail.index);
    };
    window.addEventListener("fullpage:change", handle);
    return () => window.removeEventListener("fullpage:change", handle);
  }, []);

  // Mobile — always render the solid/blurred nav background, skipping the
  // transparent-over-hero state entirely. That state depends on a scroll
  // listener -> React state update -> re-render round trip, which lags a few
  // frames behind the actual paint on real (non-dev-laptop) hardware. During
  // that lag, the nav briefly renders transparent while content has already
  // scrolled underneath it, which reads as the navbar itself vanishing.
  const [isMobileNav, setIsMobileNav] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    setIsMobileNav(mq.matches);
    const handle = (e: MediaQueryListEvent) => setIsMobileNav(e.matches);
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);

  const scrolled = isMobileNav || currentSlide > 0;

  // Lock background scroll while the mobile drawer is open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [menuOpen]);

  return (
    <>
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
        padding: "0 clamp(1.75rem, 5vw, 3rem)",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        background: scrolled ? "var(--bg-nav)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
        // Forces its own stable compositing layer — without this, position:fixed
        // combined with an animated backdrop-filter can flicker/vanish during
        // real touch-scroll on mobile Safari/Chrome (their dynamic address bar
        // resizes the viewport mid-scroll, which destabilizes the filter's layer).
        transform: "translateZ(0)",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {/* Logo — click returns to hero */}
      <button
        onClick={handleLogoClick}
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
        style={{ gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}
        className="hidden md:flex"
      >
        {navLinks.map((link) => {
          const isActive = currentSlide === link.index;
          return (
            <li key={link.label}>
              <button
                onClick={() => {
                  if (link.href) { router.push(link.href); return; }
                  if (pathname !== "/") { sessionStorage.setItem("goto-section", SECTION_IDS[link.index]); router.push("/"); return; }
                  goToSlide(link.index);
                }}
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "13.5px",
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
          className="md:hidden"
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
    </nav>

    {/* Mobile drawer — backdrop. Rendered as a sibling of <nav>, not a
        descendant: <nav> toggles backdropFilter when scrolled, and
        backdrop-filter (like transform/filter) makes its element the
        containing block for position:fixed descendants — nesting these
        inside <nav> would collapse them to its 62px height once scrolled. */}
    <div
      className="md:hidden"
      aria-hidden={!menuOpen}
      onClick={() => setMenuOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 149,
        background: "rgba(4, 6, 20, 0.6)",
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "auto" : "none",
        transition: "opacity 280ms var(--ease-out)",
      }}
    />

    {/* Mobile drawer — panel */}
    <div
      className="md:hidden"
      aria-hidden={!menuOpen}
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: 150,
        width: "clamp(240px, 75vw, 320px)",
        background: "var(--bg-nav-mobile)",
        backdropFilter: "blur(16px)",
        borderLeft: "1px solid var(--border)",
        padding: "1.5rem clamp(1.25rem, 5vw, 2rem)",
        display: "flex",
        flexDirection: "column",
        gap: "1.4rem",
        transform: menuOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 280ms var(--ease-out)",
      }}
    >
      {navLinks.map((link) => (
        <button
          key={link.label}
          onClick={() => {
            setMenuOpen(false);
            if (link.href) { router.push(link.href); return; }
            if (pathname !== "/") { sessionStorage.setItem("goto-section", SECTION_IDS[link.index]); router.push("/"); return; }
            goToSlide(link.index);
          }}
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 14,
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
    </>
  );
}
