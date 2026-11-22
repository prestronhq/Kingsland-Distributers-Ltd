'use client'
// src/components/layout/Footer.tsx
import Link from 'next/link'
import { Crown, Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '256706119011'

function WhatsAppIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.07C9.36 7.07 9.09 7.14 8.86 7.38C8.63 7.63 7.98 8.24 7.98 9.48C7.98 10.73 8.89 11.93 9.02 12.1C9.15 12.27 10.8 14.82 13.33 15.91C13.93 16.17 14.4 16.33 14.77 16.44C15.38 16.64 15.93 16.61 16.37 16.54C16.86 16.47 17.87 15.93 18.08 15.33C18.29 14.73 18.29 14.22 18.23 14.12C18.16 14.01 18 13.95 17.74 13.82C17.48 13.7 16.19 13.06 15.95 12.98C15.71 12.89 15.54 12.85 15.37 13.1C15.2 13.35 14.71 13.92 14.56 14.1C14.41 14.27 14.26 14.29 14 14.16C13.74 14.04 12.89 13.76 11.89 12.87C11.11 12.17 10.58 11.31 10.43 11.05C10.28 10.8 10.41 10.66 10.54 10.53C10.66 10.42 10.8 10.23 10.93 10.08C11.06 9.93 11.1 9.82 11.19 9.65C11.27 9.49 11.23 9.34 11.17 9.21C11.1 9.09 10.62 7.9 10.41 7.42C10.22 6.95 10.02 7.01 9.87 7C9.72 7 9.54 7 9.53 7.07Z" />
    </svg>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-neutral-950 border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-6 h-6 text-amber-500" aria-hidden="true" />
              <span className="font-bold text-white text-lg">
                Kingsland Distributors
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Uganda&apos;s premier distributor of premium spirits, wines, and
              beverages since 2010.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/products', label: 'Our Products' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
                { href: '/faq', label: 'FAQ' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-amber-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
              Customer Service
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/faq', label: 'FAQs' },
                { href: '/privacy-policy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms & Conditions' },
                { href: '/cart', label: 'View Cart' },
                { href: '/wishlist', label: 'Wishlist' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-amber-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+256757042420"
                  className="flex items-start gap-2 text-white/60 hover:text-amber-400 text-sm transition-colors group"
                >
                  <Phone className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" aria-hidden="true" />
                  +256 757 042 420
                </a>
              </li>
              <li>
                <a
                  href="tel:+256782100805"
                  className="flex items-start gap-2 text-white/60 hover:text-amber-400 text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" aria-hidden="true" />
                  +256 782 100 805
                </a>
              </li>
              <li>
                <a
                  href="mailto:kingslanddistributors.ug@gmail.com"
                  className="flex items-start gap-2 text-white/60 hover:text-amber-400 text-sm transition-colors break-all"
                >
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" aria-hidden="true" />
                  kingslanddistributors.ug@gmail.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-white/60 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" aria-hidden="true" />
                  6th Street Industrial Area, Kampala, Uganda
                </div>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://www.facebook.com/profile.php?id=61590770146071"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Kingsland Distributors on Facebook"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 text-white/70 hover:border-amber-500 hover:text-amber-400 hover:bg-amber-500/10 transition-all"
              >
                <Facebook className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/kingslanddistributors/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Kingsland Distributors on Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 text-white/70 hover:border-amber-500 hover:text-amber-400 hover:bg-amber-500/10 transition-all"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Kingsland Distributors on WhatsApp"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 text-white/70 hover:border-green-500 hover:text-green-400 hover:bg-green-500/10 transition-all"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>
            &copy; {year} Kingsland Distributors Ltd. All rights reserved.
          </p>
          <p>
            Drink Responsibly. Must be 18+ to purchase alcohol.
          </p>
          <button
            onClick={() => { localStorage.removeItem('kl_consent'); window.location.reload() }}
            className="text-white/40 hover:text-amber-400 transition-colors underline"
          >
            Cookie Settings
          </button>
          {/* Quiet builder credit — Archivo Regular, muted, 12px */}
          <p className="text-[12px] text-white/35 font-[var(--font-inter)] tracking-normal">
            Built by{' '}
            <a
              href="https://prestron.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline transition-all"
            >
              Prestron
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
