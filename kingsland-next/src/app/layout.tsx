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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kingslanduganda.com'
  ),
  title: {
    default: 'Kingsland Distributors | Premium Spirits in Uganda',
    template: '%s | Kingsland Distributors Uganda',
  },
  description:
    "Uganda's premier distributor of premium spirits, whisky, cognac, champagne, and wines. Based in Kampala's Industrial Area. Order via WhatsApp.",
  keywords: [
    'spirits distributor uganda',
    'premium whisky kampala',
    'cognac uganda',
    'kingsland distributors',
    'buy whisky uganda',
    'hennessy uganda',
    'johnnie walker kampala',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_UG',
    url: 'https://kingslanduganda.com',
    siteName: 'Kingsland Distributors',
    images: [
      {
        url: '/images/og/kingsland-og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Kingsland Distributors — Premium Spirits in Uganda',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@KingslandUG',
  },
  robots: { index: true, follow: true },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION_CODE ?? '',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
}

// JSON-LD: Organisation schema — on every page
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Kingsland Distributors Ltd',
  url: 'https://kingslanduganda.com',
  logo: 'https://kingslanduganda.com/images/kingsland-logo.png',
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
