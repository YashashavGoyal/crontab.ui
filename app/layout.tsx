import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import { getBaseUrl } from "./lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chronicle - Schedule with Precision",
  description: "Generate cron expressions using natural language or validate existing ones instantly.",
  metadataBase: new URL(getBaseUrl()),
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-200 min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1 pt-16">
          <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">

            <div className="absolute top-0 -left-4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />


            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
