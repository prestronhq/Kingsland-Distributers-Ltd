// src/app/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Phone, Star, Shield, Truck, Award } from 'lucide-react'
import { getFeaturedProducts, getAllCategories } from '@/lib/products'
import { ProductCard } from '@/components/products/ProductCard'
import { HeroSection } from '@/components/home/HeroSection'
import { StatsCounter } from '@/components/home/StatsCounter'

export const metadata: Metadata = {
  title: 'Kingsland Distributors | Premium Spirits in Uganda',
  description:
    "Uganda's premier distributor of Johnnie Walker, Hennessy, Moët & Chandon, and more. Order premium spirits in Kampala via WhatsApp.",
  alternates: { canonical: 'https://kingslanduganda.com' },
}

const stats = [
  { label: 'Premium Products', value: '31+' },
  { label: 'Years Trading', value: '15+' },
  { label: 'Happy Clients', value: '500+' },
  { label: 'Spirit Categories', value: '15' },
]

const valueProps = [
  {
    Icon: Shield,
    title: '100% Authentic',
    description:
      'Every product sourced through authorised distribution channels with full traceability.',
  },
  {
    Icon: Truck,
    title: 'Kampala Delivery',
    description:
      'Reliable delivery across Kampala Metropolitan Area within 24–48 hours.',
  },
  {
    Icon: Award,
    title: 'Premium Selection',
    description:
      'Over 31 premium spirits — whisky, cognac, champagne, vodka, gin and more.',
  },
  {
    Icon: Star,
    title: 'Since 2010',
    description:
      "Uganda's trusted distributor of world-class spirits for over 15 years.",
  },
]

const WHATSAPP =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '256706119011'

export default function HomePage() {
  const featured = getFeaturedProducts(3)
  const categories = getAllCategories().slice(0, 8)

  return (
    <>
      {/* Hero */}
      <HeroSection whatsappNumber={WHATSAPP} />

      {/* Stats — counts up every time the section enters view */}
      <section className="bg-amber-500/10 border-y border-amber-500/20 py-8" aria-label="Company statistics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <StatsCounter stats={stats} />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6" aria-labelledby="featured-heading">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-amber-500 text-sm font-semibold uppercase tracking-wider mb-1">
              Handpicked for You
            </p>
            <h2 id="featured-heading" className="text-white text-3xl font-bold font-serif">
              Featured Products
            </h2>
          </div>
          <Link
            href="/products"
            className="text-amber-400 text-sm hover:text-amber-300 flex items-center gap-1 transition-colors"
          >
            View all
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Category Quick-Links */}
      <section className="py-12 bg-neutral-950" aria-labelledby="categories-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 id="categories-heading" className="text-white text-2xl font-bold text-center mb-8 font-serif">
            Browse by Category
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/categories/${cat.replace(/\s+/g, '-')}`}
                className="px-5 py-2.5 bg-neutral-900 border border-white/10 rounded-full text-white/70 text-sm font-medium capitalize hover:border-amber-500/40 hover:text-amber-400 transition-colors"
              >
                {cat}
              </Link>
            ))}
            <Link
              href="/products"
              className="px-5 py-2.5 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-400 text-sm font-semibold hover:bg-amber-500/30 transition-colors flex items-center gap-1"
            >
              All Products
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6" aria-labelledby="why-heading">
        <h2 id="why-heading" className="text-white text-3xl font-bold text-center mb-12 font-serif">
          The Kingsland Difference
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="text-center p-6 bg-neutral-900 border border-white/5 rounded-xl hover:border-amber-500/20 transition-colors"
            >
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-amber-400" aria-hidden="true" />
              </div>
              <h3 className="text-white font-semibold mb-2">{title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-amber-900/30 to-black border-y border-amber-500/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-white text-3xl font-bold mb-4 font-serif">
            Ready to Order?
          </h2>
          <p className="text-white/70 mb-8">
            Browse our full collection of 31+ premium spirits and place your
            order instantly via WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 text-black font-bold py-3.5 px-8 rounded hover:bg-amber-400 transition-colors"
            >
              Browse All Products
            </Link>
            <a
              href="tel:+256757042420"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold py-3.5 px-8 rounded hover:bg-white/5 transition-colors"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
