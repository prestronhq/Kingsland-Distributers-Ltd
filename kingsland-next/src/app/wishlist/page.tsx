'use client'
// src/app/wishlist/page.tsx
import Link from 'next/link'
import { Heart, ArrowRight, ShoppingCart } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlistStore'
import { useCartStore } from '@/store/cartStore'
import { ProductCard } from '@/components/products/ProductCard'
import toast from 'react-hot-toast'

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore()
  const addToCart = useCartStore((s) => s.addItem)

  function addAllToCart() {
    items.forEach((item) => addToCart(item))
    toast.success(`${items.length} item${items.length !== 1 ? 's' : ''} added to cart`)
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <Heart className="w-16 h-16 text-white/20 mx-auto mb-4" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-white font-serif mb-2">
          Your Wishlist is Empty
        </h1>
        <p className="text-white/60 mb-6">
          Save products you&rsquo;re interested in — tap the heart icon on any product.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-amber-500 text-black font-bold py-3 px-7 rounded hover:bg-amber-400 transition-colors"
        >
          Browse Products
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white font-serif">
          Wishlist ({items.length} item{items.length !== 1 ? 's' : ''})
        </h1>
        <button
          onClick={addAllToCart}
          className="flex items-center gap-2 bg-amber-500 text-black font-semibold py-2 px-4 rounded text-sm hover:bg-amber-400 transition-colors"
        >
          <ShoppingCart className="w-4 h-4" aria-hidden="true" />
          Add All to Cart
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
