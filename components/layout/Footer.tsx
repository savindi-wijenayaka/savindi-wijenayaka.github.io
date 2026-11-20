import Socials from "@/data/socials";

export default function Footer() {
  return (
    <footer className="site-footer">
      <p style={{ margin: 0 }}>© {new Date().getFullYear()} Savindi Wijenayaka</p>
      <div className="foot-soc">
        {Socials.map((s) => {
          const Icon = s.icon;
          return (
            <a key={s.label} href={s.link} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
              <Icon aria-hidden />
            </a>
          );
        })}
      </div>
    </footer>
  );
}
