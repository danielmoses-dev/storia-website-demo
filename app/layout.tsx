import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0c",
};

export const metadata: Metadata = {
  title: "Storia | 100% Real Fruit Shakes & Juices",
  description:
    "Experience Storia: Delicious, wholesome shakes and cold-pressed juices crafted with real fruit, authentic ingredients, and uncompromised quality. Pure goodness in every sip.",
  keywords: [
    "Storia",
    "Storia Foods",
    "Storia Shakes",
    "Mango Shake",
    "Dutch Chocolate Shake",
    "Ruby Pomegranate Juice",
    "Cold Pressed Juice",
    "Real Fruit Juice",
    "Healthy Shakes",
  ],
  authors: [{ name: "Storia Foods & Beverages" }],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Storia | 100% Real Fruit Shakes & Juices",
    description:
      "Stories of purity and honest taste. Crafted from real fruits with zero shortcuts.",
    type: "website",
    images: [{ url: "/logo.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} dark`}>
      <body className="antialiased font-sans selection:bg-[#008744] selection:text-white">
        {children}
      </body>
    </html>
  );
}
