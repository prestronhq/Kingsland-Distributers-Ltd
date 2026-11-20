'use client'
// src/components/products/QuickViewModal.tsx
import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import Link from 'next/link'
import { X, MessageCircle } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { AddToCartSection } from './AddToCartSection'
import { analytics } from '@/lib/analytics'
import { useEffect } from 'react'
import type { Product } from '@/lib/products'

interface QuickViewModalProps {
  product: Product | null
  open: boolean
  onClose: () => void
}

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '256706119011'

export function QuickViewModal({ product, open, onClose }: QuickViewModalProps) {
  useEffect(() => {
    if (open && product) {
      analytics.productView(product)
    }
  }, [open, product])

  if (!product) return null

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

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 z-50 animate-in fade-in" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-neutral-950 border border-white/10 rounded-2xl p-6 focus:outline-none"
          aria-modal="true"
        >
          <div className="flex items-start justify-between mb-4">
            <Dialog.Title className="text-white font-bold text-lg font-serif leading-tight pr-8">
              {product.name}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                aria-label="Close quick view"
              >
                <X className="w-4 h-4 text-white" aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Image */}
            <div className="relative aspect-square bg-neutral-900 rounded-xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.altText}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-contain p-6"
              />
              {product.badge && (
                <div className="absolute top-3 left-3">
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
              <p className="text-amber-500 text-xs font-semibold uppercase tracking-wider mb-1">
                {product.brand}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant={availabilityVariant}>{availabilityLabel}</Badge>
                <span className="text-white/50 text-xs capitalize">{product.category}</span>
              </div>

              <dl className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { dt: 'Origin', dd: product.origin },
                  { dt: 'ABV', dd: product.abv },
                  { dt: 'Volume', dd: product.volume },
                ].map(({ dt, dd }) => (
                  <div key={dt} className="bg-neutral-900 rounded p-2 text-center">
                    <dt className="text-white/50 text-xs">{dt}</dt>
                    <dd className="text-white font-semibold text-xs mt-0.5">{dd}</dd>
                  </div>
                ))}
              </dl>

              <p className="text-amber-400 font-bold mb-3">{product.priceFormatted}</p>

              <p className="text-white/70 text-sm leading-relaxed mb-4">
                {product.description}
              </p>

              <AddToCartSection product={product} whatsappNumber={WHATSAPP} />

              <Link
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="block text-center text-sm text-amber-400 hover:text-amber-300 transition-colors mt-2"
              >
                View full details →
              </Link>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
