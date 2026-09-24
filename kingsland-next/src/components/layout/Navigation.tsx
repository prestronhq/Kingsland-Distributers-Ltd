'use client'
// src/components/layout/Navigation.tsx
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ShoppingCart, Heart, Menu, X, Crown, Phone, MessageCircle } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'FAQ' },
]

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '256706119011'

export function Navigation() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const cartCount = useCartStore((s) => s.totalItems())
  const wishlistCount = useWishlistStore((s) => s.count())

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-sm border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded"
            >
              <Crown className="w-6 h-6 text-amber-500" aria-hidden="true" />
              <span className="font-bold text-white text-lg leading-tight">
                Kingsland
                <span className="block text-amber-400 text-xs font-normal -mt-0.5">
                  Distributors
                </span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  className={cn(
                    'px-3 py-2 rounded text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'text-amber-400'
                      : 'text-white/70 hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Icons row */}
            <div className="flex items-center gap-1">
              {/* Wishlist + Cart: desktop only — bottom nav handles mobile */}
              <Link
                href="/wishlist"
                aria-label={`Wishlist, ${wishlistCount} item${wishlistCount !== 1 ? 's' : ''}`}
                className="relative p-2 text-white/70 hover:text-amber-400 transition-colors rounded focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none hidden md:flex"
              >
                <Heart className="w-5 h-5" aria-hidden="true" />
                {wishlistCount > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute top-0.5 right-0.5 w-4 h-4 bg-amber-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                aria-label={`Cart, ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
                className="relative p-2 text-white/70 hover:text-amber-400 transition-colors rounded focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none hidden md:flex"
              >
                <ShoppingCart className="w-5 h-5" aria-hidden="true" />
                {cartCount > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute top-0.5 right-0.5 w-4 h-4 bg-amber-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Hamburger — mobile only */}
              <button
                className="md:hidden p-2 text-white/70 hover:text-white rounded focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
                onClick={() => setMobileOpen((v) => !v)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Full-screen mobile menu overlay ─────────────────────── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          'fixed inset-0 z-50 flex flex-col bg-black md:hidden transition-opacity duration-300',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        {/* Header bar inside overlay */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-amber-500/20 shrink-0">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2"
          >
            <Crown className="w-6 h-6 text-amber-500" aria-hidden="true" />
            <span className="font-bold text-white text-lg leading-tight">
              Kingsland
              <span className="block text-amber-400 text-xs font-normal -mt-0.5">Distributors</span>
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="p-2 text-white/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Nav links — centred, large tap targets */}
        <nav
          aria-label="Mobile navigation"
          className="flex-1 flex flex-col justify-center px-6 gap-1 overflow-y-auto"
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? 'page' : undefined}
              onClick={() => setMobileOpen(false)}
              style={{ transitionDelay: mobileOpen ? `${i * 60}ms` : '0ms' }}
              className={cn(
                'flex items-center justify-between py-5 text-2xl font-bold border-b border-white/10 transition-all duration-300',
                mobileOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0',
                pathname === link.href
                  ? 'text-amber-400'
                  : 'text-white hover:text-amber-400'
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" aria-hidden="true" />
              )}
            </Link>
          ))}
        </nav>

        {/* Bottom action strip */}
        <div className="px-6 pb-8 pt-4 border-t border-white/10 shrink-0 space-y-3">
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-3 w-full bg-green-600 text-white font-bold py-4 rounded-xl text-base hover:bg-green-500 transition-colors"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            Order via WhatsApp
          </a>
          <a
            href="tel:+256757042420"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-3 w-full border border-white/20 text-white/80 font-semibold py-4 rounded-xl text-base hover:bg-white/5 transition-colors"
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            +256 757 042 420
          </a>
        </div>
      </div>
    </>
  )
}
