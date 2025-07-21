import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL('https://spolle.com'),
  title: "Spolle - Daily Music Guessing Game",
  description: "Guess a new artist every day! Daily music quiz with popular artists. Test your music knowledge with 6 different music genres.",
  keywords: "music game, artist guessing, daily game, music knowledge, spolle",
  authors: [{ name: "Spolle Team" }],
  creator: "Spolle",
  publisher: "Spolle",
  robots: "index, follow",
  openGraph: {
    title: "Spolle - Daily Music Guessing Game",
    description: "Guess a new artist every day! Daily music quiz with popular artists.",
    url: "https://spolle.com",
    siteName: "Spolle",
    type: "website",
    images: [
      {
        url: "/images/spolle-logo.png",
        width: 1200,
        height: 630,
        alt: "Spolle Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spolle - Daily Music Guessing Game",
    description: "Guess a new artist every day! Daily music quiz with popular artists.",
    images: ["/images/spolle-logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" }
    ],
    apple: [
      { url: "/favicon.png", sizes: "180x180" }
    ],
  },
  manifest: "/manifest.json",

};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#a855f7',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#a855f7" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
