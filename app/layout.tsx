import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import SocialsRail from "@/components/layout/SocialsRail";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
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

// Inline script prevents flash of unstyled theme (FOUC)
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}else{var d=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.setAttribute('data-theme',d?'dark':'light');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* eslint-disable-next-line react/no-danger */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <CustomCursor />
        <SocialsRail />
        {children}
      </body>
    </html>
  );
}
