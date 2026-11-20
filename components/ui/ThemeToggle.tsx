"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

// The inline script in the root layout sets data-theme before first paint.
const getSnapshot = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
const getServerSnapshot = (): Theme => "light";

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage may be blocked; theme still applies for this visit */
    }
  }

  const label = theme === "dark" ? "Switch to paper theme" : "Switch to lamplit theme";

  return (
    <button type="button" className="icon-btn" onClick={toggle} title={label} aria-label={label}>
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
