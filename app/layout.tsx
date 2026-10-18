import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hafizyy.com"),
  title: {
    default: "Hafizi | Developer & Data Analyst",
    template: "%s | Hafizi",
  },
  description: "Hafizi is a Malaysian developer and data analyst connecting reliable software with useful insights.",
  openGraph: {
    type: "website",
    siteName: "Hafizi",
    title: "Hafizi | Developer & Data Analyst",
    description: "Connecting reliable software with useful insights.",
    images: [{ url: "/hero/wau-bulan-flight.webp", width: 1200, height: 880, alt: "Wau Bulan kite in flight" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hafizi | Developer & Data Analyst",
    description: "Connecting reliable software with useful insights.",
    images: ["/hero/wau-bulan-flight.webp"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}

