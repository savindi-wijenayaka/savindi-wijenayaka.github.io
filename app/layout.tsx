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
