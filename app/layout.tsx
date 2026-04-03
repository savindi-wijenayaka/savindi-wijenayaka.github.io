import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://savindi.com"),
  title: {
    default: "Savindi Wijenayaka | Machine Learning Engineer & Researcher",
    template: "%s | Savindi Wijenayaka",
  },
  description:
    "Machine Learning Engineer (PhD) experienced in production-grade scalable cloud-native AI solutions (Azure/K8s), especially in deep learning and computer vision. Delivering robust solutions across diverse domains.",
  keywords: [
    "Savindi Wijenayaka",
    "Machine Learning Engineer",
    "Deep Learning",
    "Computer Vision",
    "NLP",
    "Natural Language Processing",
    "Bioengineering",
    "Medical Imaging",
    "Cloud Native",
    "Azure",
    "Kubernetes",
    "Python",
    "Keras",
    "PyTorch",
    "Java",
    "Spring Boot",
    "New Zealand",
    "Portfolio",
  ],
  authors: [{ name: "Savindi Wijenayaka" }],
  openGraph: {
    title: "Savindi Wijenayaka | Machine Learning Engineer & Researcher",
    description:
      "Machine Learning Engineer (PhD) experienced in production-grade scalable cloud-native AI solutions (Azure/K8s), especially in deep learning and computer vision. Delivering robust solutions across diverse domains.",
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
      "Machine Learning Engineer (PhD) experienced in production-grade scalable cloud-native AI solutions (Azure/K8s), especially in deep learning and computer vision. Delivering robust solutions across diverse domains.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
