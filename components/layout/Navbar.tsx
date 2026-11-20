"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";

const CV_URL = "/CV_SavindiWijenayaka_ML.pdf";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Research", href: "/#research" },
  { label: "Skills", href: "/#skills" },
  { label: "Writing", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav" aria-label="Main">
      <div className="nav-inner">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          Savindi W.
        </Link>

        <div className="nav-links">
          {navLinks.map((l) => (
            <Link key={l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="nav-tools">
          <a
            className="btn btn-honey"
            style={{ padding: "9px 16px" }}
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            CV
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="icon-btn menu-btn"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <div className={`nav-drawer${open ? " open" : ""}`} aria-hidden={!open}>
        {navLinks.map((l) => (
          <Link key={l.label} href={l.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
