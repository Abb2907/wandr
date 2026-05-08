import type { Metadata } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wandr — AI Travel Planning & Experience Engine",
  description:
    "Your proactive AI travel companion. Wandr dynamically builds, adapts, and optimizes personalized travel itineraries in real-time — before, during, and after your trip.",
  keywords: ["AI travel planner", "itinerary builder", "personalized travel", "trip planning", "travel companion"],
  openGraph: {
    title: "Wandr — AI Travel Planning & Experience Engine",
    description: "Your proactive AI travel companion that adapts in real-time.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body antialiased bg-cosmos-950 text-white selection:bg-aurora-500/30">
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-aurora-500 focus:text-cosmos-950 focus:rounded-lg focus:font-bold"
        >
          Skip to content
        </a>
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
