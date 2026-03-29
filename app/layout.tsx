import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import Navbar from "@/components/layout/navbar";
import { Martian_Mono, Tektur } from "next/font/google";
import { Box } from "@chakra-ui/react";

const martianMono = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-martian",
});

const tektur = Tektur({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-tektur",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://savindi.com"),
  title: {
    default: "Savindi Wijenayaka | Machine Learning Engineer & Researcher",
    template: "%s | Savindi Wijenayaka",
  },
  description:
    "Savindi Wijenayaka is a Machine Learning Engineer and PhD Researcher specialising in deep learning, computer vision, medical imaging, and cloud-native AI systems on Azure and Kubernetes.",
  keywords: [
    "Savindi Wijenayaka",
    "Machine Learning Engineer",
    "Deep Learning",
    "Computer Vision",
    "NLP",
    "Natural Language Processing",
    "Bioengineering",
    "Medical Imaging",
    "Cloud Native AI",
    "Azure ML",
    "Kubernetes",
    "Python",
    "PyTorch",
    "Keras",
    "TensorFlow",
    "MONAI",
    "Java",
    "Spring Boot",
    "PhD Researcher",
    "New Zealand",
    "University of Auckland",
    "Portfolio",
    "WSO2",
  ],
  authors: [{ name: "Savindi Wijenayaka", url: "https://savindi.com" }],
  creator: "Savindi Wijenayaka",
  openGraph: {
    title: "Savindi Wijenayaka | Machine Learning Engineer & Researcher",
    description:
      "Savindi Wijenayaka is a Machine Learning Engineer and PhD Researcher specialising in deep learning, computer vision, medical imaging, and cloud-native AI systems on Azure and Kubernetes.",
    url: "https://savindi.com",
    siteName: "Savindi Wijenayaka",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/brand/og_image.png",
        width: 1200,
        height: 630,
        alt: "Savindi Wijenayaka — Machine Learning Engineer & Researcher",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Savindi Wijenayaka | Machine Learning Engineer & Researcher",
    description:
      "Savindi Wijenayaka is a Machine Learning Engineer and PhD Researcher specialising in deep learning, computer vision, medical imaging, and cloud-native AI systems.",
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
  alternates: {
    canonical: "https://savindi.com",
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
      className={`${tektur.variable} ${martianMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Savindi Wijenayaka",
              url: "https://savindi.com",
              jobTitle: "Machine Learning Engineer",
              description:
                "Machine Learning Engineer and PhD Researcher specialising in deep learning, computer vision, medical imaging, and cloud-native AI systems.",
              knowsAbout: [
                "Machine Learning",
                "Deep Learning",
                "Computer Vision",
                "Medical Imaging",
                "Python",
                "PyTorch",
                "Azure",
                "Kubernetes",
                "Bioengineering",
              ],
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "University of Auckland",
                url: "https://www.auckland.ac.nz",
              },
              sameAs: [
                "https://www.linkedin.com/in/savindi",
                "https://github.com/savindi-wijenayaka",
                "https://savindi-wijenayaka.medium.com",
                "https://www.instagram.com/vindy_stories",
              ],
            }),
          }}
        />
      </head>
      <body className={`${martianMono.className}`}>
        <Provider>
          <Navbar />
          <Box as="main" bg="bg.canvas" color="fg.default">
            {children}
          </Box>
        </Provider>
      </body>
    </html>
  );
}
