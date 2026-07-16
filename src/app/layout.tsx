import type { Metadata } from "next";
import { Inter, Bebas_Neue, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import BackgroundMusic from "@/components/BackgroundMusic";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aadit | Portfolio",
  description:
    "Portfolio of Aadit — Full Stack Developer specializing in React, Next.js, Node.js and AI-powered applications.",
   keywords: [
    "Aadit Sarhadi",
    "Portfolio",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "Java",
    "Software Engineer",
    "Web Developer",
  ],

  authors: [
    {
      name: "Aadit Sarhadi",
    },
  ],

  creator: "Aadit Sarhadi",

  openGraph: {
    title: "Aadit Sarhadi",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js and AI-powered applications.",
    url: "https://aaditsarhadi.in",
    siteName: "Aadit Portfolio",
    images: [
  {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: "Aadit Sarhadi Portfolio",
  },
],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebasNeue.variable} ${jetbrainsMono.variable}`}
    >
      <body>
  <BackgroundMusic />
  {children}
  <div id="ui-root" />
</body>
    </html>
  );
}