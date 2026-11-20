import Socials from "@/data/socials";

/** Fixed left rail of social icons. Desktop (>= 1240px) only; see .rail in globals.css. */
export default function SocialsRail() {
  return (
    <aside className="rail" aria-label="Social links">
      {Socials.map((s) => {
        const Icon = s.icon;
        return (
          <a key={s.label} href={s.link} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
            <Icon aria-hidden />
            <span>{s.label}</span>
          </a>
        );
      })}
    </aside>
  );
}
