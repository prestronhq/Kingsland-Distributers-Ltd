// src/app/layout.tsx
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { SkipToContent } from '@/components/ui/SkipToContent'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'
import { AgeGate } from '@/components/layout/AgeGate'
import { CookieBanner } from '@/components/ui/CookieBanner'
import { Providers } from '@/components/layout/Providers'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.kingslanduganda.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Kingsland Distributors | Premium Spirits in Uganda',
    template: '%s | Kingsland Distributors Uganda',
  },
  description:
    "Uganda's premier distributor of premium whisky, cognac & champagne. Order in Kampala via WhatsApp.",
  keywords: [
    // Brand & identity
    'Kingsland Distributors',
    'kingsland distributors uganda',
    'kingsland distributors kampala',
    // Category — spirits
    'spirits distributor uganda',
    'premium spirits uganda',
    'liquor store uganda',
    'alcohol distributor kampala',
    'buy alcohol kampala',
    // Whisky
    'premium whisky kampala',
    'buy whisky uganda',
    'whisky distributor uganda',
    'scotch whisky uganda',
    'johnnie walker kampala',
    'johnnie walker black label uganda',
    'johnnie walker blue label uganda',
    'jameson whiskey uganda',
    'jack daniels uganda',
    'chivas regal uganda',
    'singleton whisky uganda',
    'glenmorangie uganda',
    'aberlour whisky uganda',
    // Cognac
    'cognac uganda',
    'hennessy uganda',
    'hennessy vsop kampala',
    'martell cognac uganda',
    'remy martin uganda',
    // Champagne & Wine
    'champagne uganda',
    'moet chandon uganda',
    'veuve clicquot uganda',
    'wine distributor uganda',
    'jp chenet uganda',
    'nederburg wine uganda',
    'robertson winery uganda',
    '4th street wine uganda',
    // Vodka / Gin / Rum / Other
    'grey goose vodka uganda',
    'bombay sapphire uganda',
    'bacardi rum uganda',
    'malibu uganda',
    // Tequila
    'tequila uganda',
    'clase azul tequila uganda',
    'olmeca tequila uganda',
    // Beer / Cider
    'heineken uganda',
    'savanna cider uganda',
    // Energy
    'red bull uganda',
    // Local search intent
    'buy wine kampala',
    'buy champagne kampala',
    'order spirits online uganda',
    'premium alcohol delivery kampala',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_UG',
    url: SITE_URL,
    siteName: 'Kingsland Distributors',
    title: 'Kingsland Distributors | Premium Spirits in Uganda',
    description:
      "Uganda's premier distributor of premium whisky, cognac & champagne. Order in Kampala via WhatsApp.",
    images: [
      {
        url: `${SITE_URL}/images/og/kingsland-og.png`,
        secureUrl: `${SITE_URL}/images/og/kingsland-og.png`,
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Kingsland Distributors — Premium Spirits in Uganda',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@KingslandUG',
    title: 'Kingsland Distributors | Premium Spirits in Uganda',
    description:
      "Uganda's premier distributor of premium whisky, cognac & champagne. Order in Kampala via WhatsApp.",
    images: [`${SITE_URL}/images/og/kingsland-og.png`],
  },
  robots: { index: true, follow: true },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION_CODE ?? '',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      // Crown favicon — used in browser tabs and bookmark bars
      { url: '/crown-favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/crown-favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/crown-favicon.png',
  },
  manifest: '/site.webmanifest',
}

// JSON-LD: Organisation schema — on every page
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Kingsland Distributors Ltd',
  url: SITE_URL,
  logo: `${SITE_URL}/images/kingsland-logo.png`,
  foundingDate: '2010',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+256757042420',
    contactType: 'sales',
    availableLanguage: 'English',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '6th Street Industrial Area',
    addressLocality: 'Kampala',
    addressCountry: 'UG',
  },
  sameAs: [
    'https://www.facebook.com/kingslanddistributors',
    'https://www.instagram.com/kingslanddistributors',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // data-scroll-behavior="smooth" — v16 requirement for smooth scroll during nav
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* Accessibility: skip link must be first */}
        <SkipToContent />

        {/* Age gate overlay */}
        <AgeGate />

        {/* Analytics — only loads after cookie consent */}
        <GoogleAnalytics />

        <Providers>
          <Navigation />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <MobileBottomNav />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  )
}
