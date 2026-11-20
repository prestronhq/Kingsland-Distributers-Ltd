'use client'
// src/components/layout/MobileBottomNav.tsx
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ShoppingBag, Heart, ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { cn } from '@/lib/utils'

const tabs = [
  { href: '/', label: 'Home', Icon: Home },
  { href: '/products', label: 'Shop', Icon: ShoppingBag },
  { href: '/wishlist', label: 'Wishlist', Icon: Heart },
  { href: '/cart', label: 'Cart', Icon: ShoppingCart },
]

export function MobileBottomNav() {
  const pathname = usePathname()
  const cartCount = useCartStore((s) => s.totalItems())
  const wishlistCount = useWishlistStore((s) => s.count())

  const badges: Record<string, number> = {
    '/cart': cartCount,
    '/wishlist': wishlistCount,
  }

  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-black/95 backdrop-blur-sm border-t border-amber-500/20"
    >
      <div className="flex items-center justify-around">
        {tabs.map(({ href, label, Icon }) => {
          const active = pathname === href
          const badge = badges[href] ?? 0
          return (
            <Link
              key={href}
              href={href}
              aria-label={badge > 0 ? `${label}, ${badge} item${badge !== 1 ? 's' : ''}` : label}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'relative flex flex-col items-center justify-center py-2 px-4 min-w-[44px] min-h-[44px] transition-colors',
                active ? 'text-amber-400' : 'text-white/50 hover:text-white/80'
              )}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
              <span className="text-[10px] mt-0.5">{label}</span>
              {badge > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute top-1 right-2 w-4 h-4 bg-amber-500 text-black text-[9px] font-bold rounded-full flex items-center justify-center"
                >
                  {badge}
                </span>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
