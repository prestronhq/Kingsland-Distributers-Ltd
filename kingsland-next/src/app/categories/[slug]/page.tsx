// src/app/categories/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { categories, getCategoryBySlug, getAllCategorySlugs } from '@/lib/categories'
import { getProductsByCategory } from '@/lib/products'
import { ProductGrid } from '@/components/products/ProductGrid'

// SSG: pre-render all 15 categories at build time
export function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }))
}

// v16: params is a Promise — must be awaited
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const category = getCategoryBySlug(slug)
  if (!category) return { title: 'Category Not Found' }

  return {
    title: `Buy Premium ${category.name} in Uganda`,
    description: `${category.description} Available from Kingsland Distributors, Kampala.`,
    alternates: {
      canonical: `https://kingslanduganda.com/categories/${slug}`,
    },
  }
}

// v16: params is a Promise — must be awaited
export default async function CategoryPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const category = getCategoryBySlug(slug)
  if (!category) notFound()

  const categoryProducts = getProductsByCategory(slug)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-white/50">
          <li>
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/products"
              className="hover:text-amber-400 transition-colors"
            >
              Products
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-white/80">{category.name}</li>
        </ol>
      </nav>

      <div className="mb-8">
        <p className="text-amber-500 text-sm font-semibold uppercase tracking-wider mb-1">
          Category
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-white font-serif mb-3">
          {category.name}
        </h1>
        <p className="text-white/60 max-w-2xl">{category.description}</p>
      </div>

      <p className="text-white/50 text-sm mb-6">
        Showing {categoryProducts.length} product
        {categoryProducts.length !== 1 ? 's' : ''}
      </p>

      <ProductGrid
        products={categoryProducts}
        emptyMessage={`No ${category.name} products available yet.`}
      />

      {/* Category list */}
      <section className="mt-12 pt-8 border-t border-white/10">
        <h2 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
          Browse Other Categories
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories
            .filter((c) => c.slug !== slug)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}`}
                className="px-4 py-1.5 bg-neutral-900 border border-white/10 rounded-full text-white/60 text-sm capitalize hover:border-amber-500/40 hover:text-amber-400 transition-colors"
              >
                {c.name}
              </Link>
            ))}
        </div>
      </section>
    </div>
  )
}
