import type { Metadata } from "next";
import { Inter, Bebas_Neue, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
    "Portfolio of Aadit — Full Stack Developer & AI Enthusiast. Experience the game.",
  keywords: ["developer", "portfolio", "full stack", "react", "three.js"],
  openGraph: {
    title: "Aadit | Portfolio",
    description: "Experience the game.",
    type: "website",
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
        {children}
        <div id="ui-root" />
      </body>
    </html>
  );
}