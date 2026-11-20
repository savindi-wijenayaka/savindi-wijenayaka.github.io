import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SocialsRail from "@/components/layout/SocialsRail";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false, // only used for code in blog posts; keep it off the home page's critical path
});

export const metadata: Metadata = {
  metadataBase: new URL("https://savindi.com"),
  title: {
    default: "Savindi Wijenayaka | Machine Learning Engineer & Researcher",
    template: "%s | Savindi Wijenayaka",
  },
  description:
    "Machine Learning Engineer (PhD) specialising in production-grade AI systems, deep learning, and computer vision. Building intelligent systems from research to deployment.",
  keywords: [
    "Savindi Wijenayaka",
    "Machine Learning Engineer",
    "Deep Learning",
    "Computer Vision",
    "NLP",
    "Bioengineering",
    "Medical Imaging",
    "Azure",
    "Kubernetes",
    "Python",
    "PyTorch",
    "New Zealand",
    "Portfolio",
  ],
  authors: [{ name: "Savindi Wijenayaka" }],
  openGraph: {
    title: "Savindi Wijenayaka | Machine Learning Engineer & Researcher",
    description:
      "Machine Learning Engineer (PhD) specialising in production-grade AI systems, deep learning, and computer vision.",
    url: "https://savindi.com",
    siteName: "Savindi Wijenayaka Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/brand/og_image.png",
        width: 1200,
        height: 630,
        alt: "Savindi Wijenayaka Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Savindi Wijenayaka | Machine Learning Engineer & Researcher",
    description:
      "Machine Learning Engineer (PhD) specialising in production-grade AI systems, deep learning, and computer vision.",
    images: ["/assets/brand/og_image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Savindi Wijenayaka",
  url: "https://savindi.com",
  jobTitle: "Machine Learning Engineer",
  honorificSuffix: "PhD",
  sameAs: [
    "https://www.linkedin.com/in/savindi",
    "https://github.com/savindi-wijenayaka",
    "https://savindi-wijenayaka.medium.com",
  ],
};

// Inline script prevents flash of unstyled theme (FOUC). Paper (light) is the default.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');document.documentElement.setAttribute('data-theme',t==='dark'?'dark':'light');}catch(e){}document.documentElement.classList.add('js');})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* eslint-disable-next-line react/no-danger */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <SocialsRail />
        {children}
      </body>
    </html>
  );
}
