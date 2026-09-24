'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { categories } from '@/lib/categories'

export function CategoryNav() {
  const pathname = usePathname()

  return (
    <nav
      role="navigation"
      aria-label="Browse by category"
      className="w-full"
    >
      <div className="flex gap-2 overflow-x-auto hide-scrollbar px-1 py-2">
        {/* All Products pill */}
        <Link
          href="/products"
          className={[
            'flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap',
            pathname === '/products'
              ? 'bg-amber-500 text-black'
              : 'bg-neutral-800 text-white/70 hover:bg-neutral-700 hover:text-white',
          ].join(' ')}
          aria-current={pathname === '/products' ? 'page' : undefined}
        >
          All Products
        </Link>

        {/* Category pills */}
        {categories.map((category) => {
          const href = `/categories/${category.slug}`
          const isActive = pathname === href

          return (
            <Link
              key={category.slug}
              href={href}
              className={[
                'flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap',
                isActive
                  ? 'bg-amber-500 text-black'
                  : 'bg-neutral-800 text-white/70 hover:bg-neutral-700 hover:text-white',
              ].join(' ')}
              aria-current={isActive ? 'page' : undefined}
            >
              {category.name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
