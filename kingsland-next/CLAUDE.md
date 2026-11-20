# Kingsland Distributors — Project Documentation for AI Agents

## Overview

Next.js 16.3.6 rebuild of kingslanduganda.com — Uganda's premier premium spirits distributor.
Located at `/kingsland-next/` within the monorepo root.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.3.6 (App Router, Turbopack default) |
| Language | TypeScript 5, React 19.2 |
| Styling | Tailwind CSS v4 (CSS-first config via `@theme` in globals.css — NO tailwind.config.ts) |
| State | Zustand 5 (cart + wishlist, persisted to localStorage) |
| Forms | react-hook-form + zod + Server Actions |
| Fonts | next/font/google (Playfair Display + Inter) |
| Images | next/image + sharp, WebP format |
| Toasts | react-hot-toast |
| UI primitives | @radix-ui/react-dialog, @radix-ui/react-scroll-area |
| Analytics | GA4 via gtag (consent-gated) |

## Critical Next.js 16 Patterns (MUST follow)

```typescript
// ALL dynamic params are Promises — always await:
const { slug } = await props.params
const { category } = await props.searchParams

// Middleware is proxy.ts (NOT middleware.ts), export named 'proxy'
// File: /proxy.ts in project root

// No next lint — call eslint directly:
// "lint": "eslint src/"

// Turbopack is default for both dev AND build
// Do NOT pass --turbopack flag

// turbopack config is TOP-LEVEL in next.config.ts (not experimental.turbopack)

// updateTag (NOT revalidateTag) in Server Actions for form submissions
import { updateTag } from 'next/cache'

// revalidateTag now requires second argument:
revalidateTag('tag', 'max')
```

## Project Structure

```
kingsland-next/
├── proxy.ts                    # Age gate (Next.js 16: was middleware.ts)
├── next.config.ts              # reactCompiler: true, turbopack: {}, remotePatterns
├── vercel.json                 # Security headers
├── .env.local                  # See .env.local for all required vars
├── public/
│   ├── favicon.ico / favicon-32x32.png / favicon-16x16.png
│   ├── apple-touch-icon.png / android-chrome-192x192.png / android-chrome-512x512.png
│   ├── site.webmanifest
│   └── images/
│       ├── products/           # 31 WebP product images (slug-named)
│       ├── og/                 # kingsland-og-default.jpg (1200x630)
│       └── kingsland-logo.png
└── src/
    ├── app/
    │   ├── layout.tsx          # Root: fonts, metadata, JSON-LD org schema, providers
    │   ├── page.tsx            # Home: uses <HeroSection>, featured products, categories
    │   ├── globals.css         # Tailwind v4 @theme tokens, hide-scrollbar, reduced-motion
    │   ├── products/
    │   │   ├── page.tsx        # SSR — await searchParams
    │   │   └── [slug]/
    │   │       ├── page.tsx    # SSG — await params, uses AddToCartSection
    │   │       └── opengraph-image.tsx  # Per-product OG (await params)
    │   ├── categories/[slug]/page.tsx   # SSG — await params
    │   ├── sitemap.ts          # Auto-generates 61 URLs
    │   ├── robots.ts
    │   └── not-found.tsx
    ├── components/
    │   ├── home/HeroSection.tsx         # 'use client' — crossfade hero + taglines
    │   ├── layout/
    │   │   ├── Navigation.tsx           # 'use client'
    │   │   ├── Footer.tsx               # 'use client' (has onClick for cookie reset)
    │   │   ├── AgeGate.tsx              # 'use client'
    │   │   ├── MobileBottomNav.tsx      # 'use client'
    │   │   └── Providers.tsx            # 'use client' — Toaster wrapper
    │   ├── products/
    │   │   ├── ProductCard.tsx          # 'use client'
    │   │   ├── ProductGrid.tsx          # Server-compatible (renders ProductCard)
    │   │   ├── ProductFilters.tsx       # 'use client' — URL-synced category + search
    │   │   ├── AddToCartSection.tsx     # 'use client' — cart + WhatsApp buttons on PDP
    │   │   ├── EnquiryForm.tsx          # 'use client' — product enquiry form
    │   │   ├── CategoryNav.tsx          # 'use client' — horizontal category pills
    │   │   ├── SearchBar.tsx            # 'use client'
    │   │   └── QuickViewModal.tsx       # 'use client' — Radix Dialog
    │   ├── ui/
    │   │   ├── Button.tsx               # 'use client' (forwardRef + onClick props)
    │   │   ├── Badge.tsx                # Server-compatible
    │   │   ├── CookieBanner.tsx         # 'use client'
    │   │   └── SkipToContent.tsx        # Server-compatible
    │   ├── cart/
    │   │   ├── CartItem.tsx             # 'use client'
    │   │   └── CartSummary.tsx          # 'use client'
    │   └── analytics/GoogleAnalytics.tsx  # 'use client'
    ├── actions/
    │   ├── contact.ts          # 'use server' — zod + updateTag
    │   └── enquiry.ts          # 'use server' — returns WhatsApp URL
    ├── store/
    │   ├── cartStore.ts        # Zustand + persist
    │   └── wishlistStore.ts    # Zustand + persist
    ├── lib/
    │   ├── products.ts         # 31 products + helpers (getProductBySlug etc.)
    │   ├── categories.ts       # 15 categories + helpers
    │   ├── faq.ts              # 15 FAQs
    │   ├── analytics.ts        # GA4 event helpers
    │   ├── metadata.ts         # Shared metadata builder
    │   └── utils.ts            # cn(), slugify(), formatPrice()
    ├── hooks/
    │   ├── useCart.ts          # Re-exports useCartStore
    │   ├── useWishlist.ts      # Re-exports useWishlistStore
    │   └── useAnalytics.ts     # Re-exports analytics helpers
    └── types/
        ├── product.ts          # Product interface
        └── index.ts            # Category interface
```

## Key Business Data

- **WhatsApp**: +256706119011 (env: NEXT_PUBLIC_WHATSAPP_NUMBER)
- **Phone**: +256 757 042 420 / +256 782 100 805
- **Email**: kingslanddistributors.ug@gmail.com
- **Address**: 6th Street Industrial Area, Kampala, Uganda
- **Domain**: kingslanduganda.com
- **Products**: 31 premium spirits across 15 categories
- **All prices**: "Contact for Price" (no UGX prices set — enquiry-based)

## Build Commands

```bash
cd kingsland-next
npm run dev          # Turbopack dev server
npm run build        # Production build (Turbopack)
npm run start        # Start production server
npm run lint         # eslint src/
npm run typegen      # Generate PageProps type helpers for all dynamic routes
npm run format       # Prettier
```

## Current Build Status

✅ **Clean build — 61 pages, zero errors** (last verified Sep 2026)

- 31 × `/products/[slug]` — SSG
- 15 × `/categories/[slug]` — SSG
- 10 static pages — `/`, `/about`, `/cart`, `/checkout`, `/contact`, `/faq`, `/privacy-policy`, `/terms`, `/wishlist`, `/_not-found`
- 1 dynamic — `/products` (SSR for searchParams)
- Generated: `/sitemap.xml`, `/robots.txt`
- Dynamic OG: `/products/[slug]/opengraph-image`

## Environment Variables Required

```
NEXT_PUBLIC_SITE_URL=https://kingslanduganda.com
NEXT_PUBLIC_WHATSAPP_NUMBER=256706119011
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX   # Fill in from GA4
NEXT_PUBLIC_GSC_VERIFICATION_CODE=           # Fill in from GSC
RESEND_API_KEY=re_xxxx                       # Fill in from resend.com
CONTACT_EMAIL=kingslanddistributors.ug@gmail.com
```

## Common Gotchas

1. **Tailwind v4**: Uses `@theme` in `globals.css`, NOT `tailwind.config.ts`. Custom tokens: `brand-gold`, `brand-gold-light`, `brand-gold-hover`, `brand-dark`, `brand-surface`.

2. **'use client' on event-handler components**: Any component with `onClick`, `onChange`, `useState`, `useEffect`, `useRef` MUST have `'use client'`. Missing it causes "Event handlers cannot be passed to Client Component props" prerender error.

3. **Product detail page is a Server Component** — interactive buttons (Add to Cart, WhatsApp) are in `AddToCartSection.tsx` (Client Component) imported into the page.

4. **All dynamic params are Promises** — `const { slug } = await props.params` everywhere.

5. **No favicon.ico in /public/** — the root favicon is `src/app/favicon.ico` (Next.js App Router convention). `/public/favicon-32x32.png` etc. are for PWA/Apple only.

## Deployment

Target: Vercel
- Import `kingsland-next/` subfolder as the project root
- Set all env vars from `.env.local`
- Node.js 20 auto-detected
- Domain: kingslanduganda.com → set in Vercel dashboard

## Post-launch TODO

- [ ] Add real GA4 Measurement ID to env vars
- [ ] Add GSC verification code and submit sitemap
- [ ] Replace placeholder social URLs in Footer with real handles
- [ ] Wire up Resend API key for contact form email delivery
- [ ] Add real Google Maps embed on contact page
- [ ] Compress any product images over 200KB (check: robertson-winery 122KB, bacardi 136KB, chivas 107KB — all fine)
