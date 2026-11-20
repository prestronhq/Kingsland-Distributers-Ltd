'use client'
// src/components/products/ProductCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, MessageCircle } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { analytics } from '@/lib/analytics'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import type { Product } from '@/lib/products'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((s) => s.addItem)
  const toggleWishlist = useWishlistStore((s) => s.toggle)
  const isWishlisted = useWishlistStore((s) => s.isInWishlist(product.id))

  function handleAddToCart() {
    addToCart(product)
    analytics.addToCart(product)
    toast.success(`${product.name} added to cart`)
  }

  function handleWishlist() {
    const added = toggleWishlist(product)
    toast.success(added ? 'Added to wishlist' : 'Removed from wishlist')
  }

  const badgeVariant =
    product.badge === 'Best Seller'
      ? 'gold'
      : product.badge === 'Limited Edition'
        ? 'amber'
        : 'green'

  return (
    <article className="group bg-neutral-900 border border-white/10 rounded-xl overflow-hidden hover:border-amber-500/40 transition-all hover:shadow-lg hover:shadow-amber-500/5">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-neutral-800">
        <Link
          href={`/products/${product.slug}`}
          aria-label={`View ${product.name} details`}
        >
          <Image
            src={product.image}
            alt={product.altText}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <Heart
            className={cn(
              'w-4 h-4 transition-colors',
              isWishlisted ? 'text-amber-500 fill-amber-500' : 'text-white/60'
            )}
            aria-hidden="true"
          />
        </button>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2 left-2">
            <Badge variant={badgeVariant}>{product.badge}</Badge>
          </div>
        )}

        {/* Availability overlay for limited/enquire */}
        {product.availability === 'limited' && (
          <div className="absolute bottom-2 left-2">
            <Badge variant="amber">Limited Stock</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-amber-500/80 text-xs font-medium uppercase tracking-wider mb-1">
          {product.brand}
        </p>
        <h3 className="text-white font-semibold text-sm leading-snug mb-1 line-clamp-2">
          <Link
            href={`/products/${product.slug}`}
            className="hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:text-amber-400"
          >
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center gap-2 text-white/50 text-xs mb-3">
          <span>{product.origin}</span>
          <span aria-hidden="true">·</span>
          <span>{product.abv}</span>
          <span aria-hidden="true">·</span>
          <span>{product.volume}</span>
        </div>
        <p className="text-amber-400 font-semibold text-sm mb-3">
          {product.priceFormatted}
        </p>

        {/* Actions */}
        <div className="flex gap-2">
          {product.availability !== 'enquire' ? (
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-1.5 bg-amber-500 text-black text-xs font-semibold py-2 px-3 rounded hover:bg-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart className="w-3.5 h-3.5" aria-hidden="true" />
              Add to Cart
            </button>
          ) : (
            <Link
              href={`/products/${product.slug}#enquiry`}
              className="flex-1 flex items-center justify-center gap-1.5 bg-amber-500 text-black text-xs font-semibold py-2 px-3 rounded hover:bg-amber-400 transition-colors"
              aria-label={`Enquire about ${product.name}`}
            >
              <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
              Enquire
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
