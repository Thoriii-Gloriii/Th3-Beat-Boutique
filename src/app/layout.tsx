import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { AppProvider } from "@/lib/store";
import TopHeader from "@/components/layout/TopHeader";
import BottomNavigation from "@/components/layout/BottomNavigation";
import StickyPlayer from "@/components/layout/StickyPlayer";

export const metadata: Metadata = {
  title: "TH3 B3ATZ BOUTIQ3",
  description: "Exclusive Beat Store & Creator Ecosystem",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased min-h-screen flex flex-col bg-[var(--background)] pb-36`}>
        <AppProvider>
          <TopHeader />
          <main className="flex-1 flex flex-col w-full max-w-7xl mx-auto">{children}</main>
          <StickyPlayer />
          <BottomNavigation />
        </AppProvider>
      </body>
    </html>
  );
}
