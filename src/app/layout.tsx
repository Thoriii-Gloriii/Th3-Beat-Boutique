import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopHeader from "@/components/layout/TopHeader";
import BottomNavigation from "@/components/layout/BottomNavigation";
import StickyPlayer from "@/components/layout/StickyPlayer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TH3 B3ATZ BOUTIQ3",
  description: "Exclusive Beat Store & Creator Ecosystem",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-[var(--background)] pb-20`}
      >
        <TopHeader />
        <main className="flex-1 flex flex-col w-full max-w-7xl mx-auto">
          {children}
        </main>
        <StickyPlayer />
        <BottomNavigation />
      </body>
    </html>
  );
}
