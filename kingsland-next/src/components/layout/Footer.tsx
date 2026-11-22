'use client'
// src/components/layout/Footer.tsx
import Link from 'next/link'
import { Crown, Phone, Mail, MapPin } from 'lucide-react'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '256706119011'

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

            {/* Projects */}
            <div className="mt-5 pt-4 border-t border-white/10">
              <h4 className="text-white font-semibold mb-2.5 text-xs uppercase tracking-wider text-amber-400">
                Projects
              </h4>
              <ul className="space-y-1.5">
                {[
                  { label: 'Corporate & Event Supply', href: '/contact' },
                  { label: 'Hospitality & Bar Distribution', href: '/about' },
                  { label: 'Private Cellar Curation', href: '/products' },
                  { label: 'Wholesale Orders', href: '/contact' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-white/60 hover:text-amber-400 text-xs transition-colors block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
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
