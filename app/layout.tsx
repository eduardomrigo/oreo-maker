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
  generator: 'Next.js',
  title: 'Oreo Maker',
  description: 'Monte sua Oreo de forma divertida e nostálgica',
  applicationName: 'Oreo Maker',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript', 'typescript', 'nextjs', 'frontend', 'developer', 'front end', 'programmer'],
  authors: [{ name: 'Eduardo Rigo', url: 'https://eduardev.com' }],
  creator: 'Eduardo Rigo',
  publisher: 'Eduardo Rigo',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Oreo Maker',
    description: 'Monte sua Oreo de forma divertida e nostálgica',
    url: 'https://oreo.eduardev.com',
    siteName: 'Oreo Maker',
    images: [
      {
        url: 'https://www.oreo.eduardev.com/images/bg.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://www.oreo.eduardev.com/images/bg-g.png',
        width: 1800,
        height: 1600,
      },
    ],
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
}


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
