import type { Metadata } from "next";
import { Provider } from "@/components/ui/provider";
import Navbar from "@/components/navbar";
import { Martian_Mono, Cookie } from "next/font/google";
import { Box } from "@chakra-ui/react";

const martianMono = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-martian",
});

const cookie = Cookie({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cookie",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://savindi-wijenayaka.github.io"),
  title: {
    default: "Savindi Wijenayaka | Machine Learning Engineer & Researcher",
    template: "%s | Savindi Wijenayaka",
  },
  description:
    "Portfolio of Savindi Wijenayaka, a Machine Learning Engineer and Bioengineering Researcher specializing in deep learning, computer vision, and cloud-native development.",
  keywords: [
    "Savindi Wijenayaka",
    "Machine Learning Engineer",
    "Deep Learning",
    "Computer Vision",
    "Bioengineering",
    "Sri Lanka",
    "New Zealand",
    "Portfolio",
    "AI Researcher",
  ],
  authors: [{ name: "Savindi Wijenayaka" }],
  openGraph: {
    title: "Savindi Wijenayaka | Machine Learning Engineer & Researcher",
    description:
      "Portfolio of Savindi Wijenayaka, a Machine Learning Engineer and Bioengineering Researcher specializing in deep learning, computer vision, and cloud-native development.",
    url: "https://savindi-wijenayaka.github.io",
    siteName: "Savindi Wijenayaka Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg", // We should ensure this image exists or use a default
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
      "Machine Learning Engineer and Researcher in deep learning and cloud-native applications.",
    // images: ["/images/og-image.jpg"], // Uncomment when image is available
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
      suppressHydrationWarning
      className={`${cookie.variable} ${martianMono.variable}`}
    >
      <body className={`${martianMono.className}`}>
        <Provider>
          <Navbar></Navbar>
          <Box bg="brand.bg">{children}</Box>
        </Provider>
      </body>
    </html>
  );
}
