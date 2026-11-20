// src/app/products/page.tsx
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { products, getAllCategories } from '@/lib/products'
import { ProductGrid } from '@/components/products/ProductGrid'
import { ProductFilters } from '@/components/products/ProductFilters'

export const metadata: Metadata = {
  title: 'Premium Spirits Collection | Shop Now',
  description:
    'Browse 31+ premium spirits — Scotch whisky, cognac, champagne, vodka, gin and more in Kampala, Uganda.',
  alternates: { canonical: 'https://kingslanduganda.com/products' },
}

// v16: searchParams is a Promise — must be awaited
export default async function ProductsPage(props: {
  searchParams: Promise<{ category?: string; q?: string }>
}) {
  const searchParams = await props.searchParams
  const { category, q } = searchParams

  const allCategories = getAllCategories()

  const filtered = products.filter((p) => {
    const matchesCategory = !category || p.category === category
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.brand.toLowerCase().includes(q.toLowerCase()) ||
      p.category.toLowerCase().includes(q.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <p className="text-amber-500 text-sm font-semibold uppercase tracking-wider mb-1">
          Our Range
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-white font-serif">
          Premium Spirits Collection
        </h1>
        <p className="text-white/60 mt-2">
          Authentic premium spirits from the world&rsquo;s finest distilleries —
          delivered to your door in Kampala.
        </p>
      </div>

      <Suspense>
        <ProductFilters
          categories={allCategories}
          selectedCategory={category}
          searchQuery={q}
          totalCount={products.length}
          filteredCount={filtered.length}
        />
      </Suspense>

      <ProductGrid
        products={filtered}
        emptyMessage="No products match your search."
      />
    </div>
  )
}
