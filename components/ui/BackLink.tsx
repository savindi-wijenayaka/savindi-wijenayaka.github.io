import Link from "next/link";

export default function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="bl-back">
      {label}
    </Link>
  );
}
