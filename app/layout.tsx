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
  title: "Spolle - Günlük Müzik Tahmin Oyunu",
  description: "Her gün yeni bir sanatçı tahmin et! Spotify ile entegre günlük müzik bilgi yarışması. 6 farklı müzik türü ile müzik bilgini test et.",
  keywords: "müzik oyunu, sanatçı tahmin, spotify, günlük oyun, müzik bilgisi, spolle",
  authors: [{ name: "Spolle Team" }],
  creator: "Spolle",
  publisher: "Spolle",
  robots: "index, follow",
  openGraph: {
    title: "Spolle - Günlük Müzik Tahmin Oyunu",
    description: "Her gün yeni bir sanatçı tahmin et! Spotify ile entegre günlük müzik bilgi yarışması.",
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
    title: "Spolle - Günlük Müzik Tahmin Oyunu",
    description: "Her gün yeni bir sanatçı tahmin et! Spotify ile entegre günlük müzik bilgi yarışması.",
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
    <html lang="tr">
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
