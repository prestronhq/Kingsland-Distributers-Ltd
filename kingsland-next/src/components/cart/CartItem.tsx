'use client'
// src/components/cart/CartItem.tsx
import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCartStore, type CartItem as CartItemType } from '@/store/cartStore'

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCartStore()

  return (
    <div className="flex gap-4 bg-neutral-900 border border-white/10 rounded-xl p-4">
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
        <h3 className="text-white font-medium text-sm leading-snug truncate">
          {item.name}
        </h3>
        <p className="text-white/50 text-xs mt-0.5">
          {item.origin} · {item.abv}
        </p>
        <p className="text-amber-400 text-sm font-semibold mt-1">
          {item.priceFormatted}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <div
            className="flex items-center gap-1"
            role="group"
            aria-label={`Quantity for ${item.name}`}
          >
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              aria-label={`Decrease quantity of ${item.name}`}
              className="w-7 h-7 rounded border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
            >
              <Minus className="w-3 h-3" aria-hidden="true" />
            </button>
            <span
              className="text-white text-sm w-6 text-center"
              aria-live="polite"
              aria-atomic="true"
            >
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              aria-label={`Increase quantity of ${item.name}`}
              className="w-7 h-7 rounded border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
            >
              <Plus className="w-3 h-3" aria-hidden="true" />
            </button>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            aria-label={`Remove ${item.name} from cart`}
            className="text-red-400 hover:text-red-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-400 rounded"
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
