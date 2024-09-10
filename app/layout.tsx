import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Oreo Maker",
  description: "Crie sua Oreoreoreo",
  authors: [
    {
      name: "Eduardo Rigo",
      url: "https://eduardev.com/",
    },
  ],
  openGraph: {
    title: "Oreo Maker",
    description: "Crie sua Oreoreoreo",
    url: "https://www.yoursite.com",
    siteName: "Oreo Maker",
    images: [
      {
        url: "/images/thumbnail.png",
        width: 800,
        height: 600,
        alt: "Thumbnail Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oreo Maker",
    description: "Crie sua Oreoreoreo",
    images: ["/images/thumbnail.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
