// src/app/products/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MapPin } from 'lucide-react'
import { products, getProductBySlug, getProductsByCategory } from '@/lib/products'
import { EnquiryForm } from '@/components/products/EnquiryForm'
import { ProductCard } from '@/components/products/ProductCard'
import { Badge } from '@/components/ui/Badge'
import { AddToCartSection } from '@/components/products/AddToCartSection'

// SSG: pre-render all 31 products at build time
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

// v16: params is a Promise — must be awaited
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Product Not Found' }

  return {
    title: `${product.name} — Buy in Uganda`,
    description: `${product.description} Available from Kingsland Distributors, Kampala. ${product.origin} · ${product.abv} · ${product.volume}`,
    alternates: {
      canonical: `https://kingslanduganda.com/products/${slug}`,
    },
    openGraph: {
      title: `${product.name} | Kingsland Distributors`,
      description: product.description,
      images: [
        {
          url: `https://kingslanduganda.com${product.image}`,
          width: 800,
          height: 800,
          alt: product.altText,
        },
      ],
    },
  }
}

// v16: params is a Promise — must be awaited
export default async function ProductPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  // JSON-LD: Product schema
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.longDescription,
    image: `https://kingslanduganda.com${product.image}`,
    brand: { '@type': 'Brand', name: product.brand },
    offers: {
      '@type': 'Offer',
      availability:
        product.availability === 'in_stock'
          ? 'https://schema.org/InStock'
          : product.availability === 'limited'
            ? 'https://schema.org/LimitedAvailability'
            : 'https://schema.org/OnlineOnly',
      priceCurrency: 'UGX',
      price: product.price,
      seller: {
        '@type': 'Organization',
        name: 'Kingsland Distributors Ltd',
      },
    },
    countryOfOrigin: product.origin,
  }

  const availabilityLabel = {
    in_stock: 'In Stock',
    limited: 'Limited Stock',
    enquire: 'Enquire for Availability',
  }[product.availability]

  const availabilityVariant = {
    in_stock: 'green',
    limited: 'amber',
    enquire: 'neutral',
  }[product.availability] as 'green' | 'amber' | 'neutral'

  const WHATSAPP =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '256706119011'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
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
            <li className="text-white/80 truncate max-w-[200px]">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          {/* Image */}
          <div className="relative aspect-square max-w-md mx-auto lg:mx-0 w-full bg-neutral-900 rounded-2xl overflow-hidden border border-white/10">
            <Image
              src={product.image}
              alt={product.altText}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-8"
            />
            {product.badge && (
              <div className="absolute top-4 left-4">
                <Badge
                  variant={
                    product.badge === 'Best Seller'
                      ? 'gold'
                      : product.badge === 'Limited Edition'
                        ? 'amber'
                        : 'green'
                  }
                >
                  {product.badge}
                </Badge>
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <p className="text-amber-500 text-sm font-semibold mb-1">
              {product.brand}
            </p>
            <h1 className="text-3xl font-bold text-white mb-3 font-serif">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant={availabilityVariant}>{availabilityLabel}</Badge>
              <span className="text-white/50 text-sm capitalize">
                {product.category}
              </span>
            </div>

            {/* Specs */}
            <dl className="grid grid-cols-3 gap-3 mb-5">
              {[
                { dt: 'Origin', dd: product.origin },
                { dt: 'ABV', dd: product.abv },
                { dt: 'Volume', dd: product.volume },
              ].map(({ dt, dd }) => (
                <div
                  key={dt}
                  className="bg-neutral-900 rounded-lg p-3 text-center"
                >
                  <dt className="text-white/50 text-xs mb-0.5">{dt}</dt>
                  <dd className="text-white font-semibold text-sm">{dd}</dd>
                </div>
              ))}
            </dl>

            <p className="text-amber-400 text-xl font-bold mb-4">
              {product.priceFormatted}
            </p>

            <p className="text-white/70 leading-relaxed mb-6">
              {product.longDescription}
            </p>

            {/* CTAs — Client Component handles cart + WhatsApp interactivity */}
            <AddToCartSection product={product} whatsappNumber={WHATSAPP} />

            {/* Location */}
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <MapPin className="w-4 h-4 shrink-0 text-amber-500" aria-hidden="true" />
              Available from 6th Street Industrial Area, Kampala
            </div>
          </div>
        </div>

        {/* Enquiry Form */}
        <div id="enquiry" className="max-w-xl mb-16">
          <EnquiryForm productName={product.name} productSlug={product.slug} />
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section aria-labelledby="related-heading">
            <h2
              id="related-heading"
              className="text-white text-2xl font-bold mb-6 font-serif"
            >
              More {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
