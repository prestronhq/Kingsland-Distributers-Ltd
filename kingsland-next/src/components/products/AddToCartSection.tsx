'use client'
// src/components/products/AddToCartSection.tsx
// Client Component — handles cart + WhatsApp interactivity on product detail page
import { ShoppingCart, MessageCircle } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { analytics } from '@/lib/analytics'
import toast from 'react-hot-toast'
import type { Product } from '@/lib/products'

interface AddToCartSectionProps {
  product: Product
  whatsappNumber: string
}

export function AddToCartSection({
  product,
  whatsappNumber,
}: AddToCartSectionProps) {
  const addToCart = useCartStore((s) => s.addItem)

  function handleAddToCart() {
    addToCart(product)
    analytics.addToCart(product)
    toast.success(`${product.name} added to cart`)
  }

  const whatsappMessage = `Hi, I'm interested in ${product.name}. Please send me pricing and availability.`
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-8">
      {product.availability !== 'enquire' && (
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 flex items-center justify-center gap-2 bg-amber-500 text-black font-bold py-3 px-5 rounded hover:bg-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart className="w-4 h-4" aria-hidden="true" />
          Add to Cart
        </button>
      )}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 px-5 rounded hover:bg-green-500 transition-colors"
        onClick={() => analytics.whatsappClick(product.name)}
      >
        <MessageCircle className="w-4 h-4" aria-hidden="true" />
        Enquire via WhatsApp
      </a>
    </div>
  )
}
