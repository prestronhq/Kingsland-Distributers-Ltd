'use client'
// src/components/cart/CartSummary.tsx
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '256706119011'

export function CartSummary() {
  const { items, totalItems, totalValue } = useCartStore()

  function buildWhatsAppMessage() {
    if (items.length === 0) return ''
    const lines = [
      '*Order from Kingsland Distributors*',
      '',
      ...items.map(
        (item) =>
          `\u2022 ${item.name} \xd7${item.quantity}${item.price ? ` (UGX ${(item.price * item.quantity).toLocaleString()})` : ''}`
      ),
      '',
      `*Total items:* ${totalItems()}`,
      '',
      'Please confirm availability, pricing, and delivery details.',
    ]
    return lines.join('\n')
  }

  return (
    <div className="bg-neutral-900 border border-white/10 rounded-xl p-6">
      <h2 className="text-white font-semibold text-lg mb-4">Order Summary</h2>
      <div className="space-y-2 mb-5 text-sm text-white/70">
        <div className="flex justify-between">
          <span>Items ({totalItems()})</span>
          <span>
            {totalValue() > 0
              ? `UGX ${totalValue().toLocaleString()}`
              : 'Contact for price'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>Confirmed via WhatsApp</span>
        </div>
      </div>
      <div className="border-t border-white/10 pt-4 mb-5">
        <div className="flex justify-between text-white font-semibold">
          <span>Total</span>
          <span>
            {totalValue() > 0
              ? `UGX ${totalValue().toLocaleString()}`
              : 'Contact for quote'}
          </span>
        </div>
      </div>
      <a
        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(buildWhatsAppMessage())}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 px-5 rounded hover:bg-green-500 transition-colors mb-3"
      >
        <MessageCircle className="w-4 h-4" aria-hidden="true" />
        Place Order via WhatsApp
      </a>
      <Link
        href="/checkout"
        className="w-full flex items-center justify-center text-sm bg-amber-500 text-black font-bold py-2.5 px-5 rounded hover:bg-amber-400 transition-colors mb-3"
      >
        Proceed to Checkout
      </Link>
      <Link
        href="/products"
        className="w-full flex items-center justify-center text-sm text-white/60 hover:text-amber-400 transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  )
}
