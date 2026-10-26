import type {Metadata} from 'next';
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import LenisProvider from '@/components/LenisProvider';
import { TransitionProvider } from '@/context/TransitionContext';
import { PageTransition } from '@/components/PageTransition';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const BASE_URL = 'https://www.kingicecream.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'King Ice Cream | Premium Ice Cream from Belagavi — Taste of Royalty',
    template: '%s | King Ice Cream',
  },
  description: 'King Ice Cream — premium ice cream made from 100% pure milk by Vijaykant Dairy & Food Products Ltd., Belagavi. No palm oil. Cones, Cups, Kulfi, Sticks, Sundaes & Family Packs available across 15,000+ outlets in Karnataka, Goa, Maharashtra & Kerala.',
  keywords: [
    'King Ice Cream', 'Belagavi ice cream', 'premium ice cream India', 'Vijaykant Dairy',
    'Karnataka ice cream', 'pure milk ice cream', 'no palm oil ice cream', 'ice cream near me',
    'kulfi', 'matka kulfi', 'chocobar', 'ice cream franchise India', 'Goa ice cream',
    'Maharashtra ice cream', 'Kerala ice cream', 'King Ice Cream parlour', 'best ice cream Belagavi',
    'Hubli ice cream', 'Dharwad ice cream', 'ice cream delivery', 'Kwality Walls manufacturer',
    'HUL ice cream', 'dairy ice cream India', 'King cone', 'King cup', 'King sundae',
  ],
  icons: {
    icon: '/images/logos/king logo.png',
    apple: '/images/logos/king logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'King Ice Cream',
    title: 'King Ice Cream | Premium Ice Cream from Belagavi — Taste of Royalty',
    description: 'Premium ice cream made from 100% pure milk. No palm oil. 20+ years of dairy mastery by Vijaykant Dairy. Available across 15,000+ outlets in 4 states.',
    images: [
      {
        url: '/images/logos/king logo.png',
        width: 1200,
        height: 630,
        alt: 'King Ice Cream — Taste of Royalty',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'King Ice Cream | Taste of Royalty',
    description: 'Premium ice cream made from 100% pure milk. No palm oil. 20+ years of dairy mastery. 15,000+ outlets across Karnataka, Goa, Maharashtra & Kerala.',
    images: ['/images/logos/king logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: 'your-verification-code',
  },
  category: 'food & beverages',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${playfair.variable}`}>
      <head>
        {/* Preload key Nohemi font weights for performance */}
        <link rel="preload" href="/fonts/Nohemi-Font/Nohemi-Bold-BF6438cc577b524.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Nohemi-Font/Nohemi-ExtraBold-BF6438cc5761ae2.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Nohemi-Font/Nohemi-Black-BF6438cc565e67b.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Nohemi-Font/Nohemi-Medium-BF6438cc57ddecd.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <meta name="theme-color" content="#00799b" />
      </head>
      <body className="font-sans antialiased grain">
        <TransitionProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
          <PageTransition />
        </TransitionProvider>
        <Toaster />
      </body>
    </html>
  );
}
