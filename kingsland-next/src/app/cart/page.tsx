'use client'
// src/app/cart/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { Button } from '@/components/ui/Button'

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalValue } =
    useCartStore()

  const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '256706119011'

  function buildWhatsAppMessage() {
    if (items.length === 0) return ''
    const lines = [
      '*Order Enquiry — Kingsland Distributors*',
      '',
      '*Items Requested:*',
      ...items.map((item) => `• ${item.name} × ${item.quantity}`),
      '',
      `*Total items:* ${totalItems()}`,
      '',
      'Please confirm availability, pricing, and delivery details.',
    ]
    return lines.join('\n')
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-white/20 mx-auto mb-4" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-white font-serif mb-2">
          Your Cart is Empty
        </h1>
        <p className="text-white/60 mb-6">
          Browse our collection and add items to your cart.
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white font-serif">
          Your Cart ({totalItems()} item{totalItems() !== 1 ? 's' : ''})
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-400 hover:text-red-300 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-neutral-900 border border-white/10 rounded-xl p-4"
            >
              <div className="relative w-20 h-20 shrink-0 bg-neutral-800 rounded-lg overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.altText}
                  fill
                  sizes="80px"
                  className="object-contain p-2"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-white font-medium text-sm leading-snug truncate">
                  {item.name}
                </h2>
                <p className="text-white/50 text-xs mt-0.5">
                  {item.origin} · {item.abv}
                </p>
                <p className="text-amber-400 text-sm font-semibold mt-1">
                  {item.priceFormatted}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1" role="group" aria-label={`Quantity for ${item.name}`}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label={`Decrease quantity of ${item.name}`}
                      className="w-7 h-7 rounded border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
                    >
                      <Minus className="w-3 h-3" aria-hidden="true" />
                    </button>
                    <span className="text-white text-sm w-6 text-center" aria-live="polite">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label={`Increase quantity of ${item.name}`}
                      className="w-7 h-7 rounded border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
                    >
                      <Plus className="w-3 h-3" aria-hidden="true" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-neutral-900 border border-white/10 rounded-xl p-6 h-fit">
          <h2 className="text-white font-semibold text-lg mb-4">
            Order Summary
          </h2>
          <div className="space-y-2 mb-5 text-sm text-white/70">
            <div className="flex justify-between">
              <span>Items ({totalItems()})</span>
              <span className="italic text-white/50">Price on request</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>Confirmed via WhatsApp</span>
            </div>
          </div>
          <div className="border-t border-white/10 pt-4 mb-5">
            <div className="flex justify-between text-white font-semibold">
              <span>Total</span>
              <span className="text-amber-400">Quoted via WhatsApp</span>
            </div>
            <p className="text-white/40 text-xs mt-1">
              Our team will confirm pricing after you send your order.
            </p>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(buildWhatsAppMessage())}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 px-5 rounded hover:bg-green-500 transition-colors mb-3"
          >
            Place Order via WhatsApp
          </a>
          <Link
            href="/products"
            className="w-full flex items-center justify-center text-sm text-white/60 hover:text-amber-400 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
