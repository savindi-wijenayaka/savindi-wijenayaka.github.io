import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="rail-safe-x"
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "1rem",
      }}
    >
      <h1 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--ink)" }}>
        Page not found
      </h1>
      <p style={{ color: "var(--muted)" }}>That page doesn&apos;t exist or has moved.</p>
      <Link href="/" style={{ color: "var(--plum)", textDecoration: "underline" }}>
        Back to home
      </Link>
    </main>
  );
}
