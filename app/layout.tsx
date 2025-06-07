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
  title: "Savindi Wijenayaka Portfolio",
  description:
    "Machine Learning Engineer and Researcher with over two years of experience in applied deep learning \
    and developing scalable, production-grade cloud-native applications. PhD in Bioengineering, currently \
    under examination, with over three years of interdisciplinary research combining medical imaging, \
    computational quantification, and deep learning-based analysis. Driven by a passion for building AI \
    solutions with real-world impact and committed to bridging the gap between research and application.",
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
