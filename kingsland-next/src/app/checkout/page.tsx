'use client'
// src/app/checkout/page.tsx
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, MessageCircle, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { analytics } from '@/lib/analytics'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const { items, totalItems, totalValue } = useCartStore()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '256706119011'

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-white/20 mx-auto mb-4" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-white font-serif mb-2">
          Your Cart is Empty
        </h1>
        <p className="text-white/60 mb-6">Add items to your cart before checking out.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-amber-500 text-black font-bold py-3 px-7 rounded hover:bg-amber-400 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  function validate() {
    const errs: Record<string, string> = {}
    if (!name.trim() || name.trim().length < 2) errs.name = 'Please enter your name'
    if (!phone.trim() || phone.trim().length < 10) errs.phone = 'Please enter a valid phone number'
    return errs
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    const lines = [
      '*Order Enquiry — Kingsland Distributors*',
      '',
      `*Customer:* ${name.trim()}`,
      `*Phone:* ${phone.trim()}`,
      address.trim() ? `*Delivery Address:* ${address.trim()}` : null,
      '',
      '*Items Requested:*',
      ...items.map((item) => `• ${item.name} × ${item.quantity}`),
      '',
      'Please confirm availability, pricing, and delivery details.',
      '',
      '_Thank you!_',
    ]
      .filter(Boolean)
      .join('\n')

    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines)}`
    analytics.whatsappClick('checkout')
    window.open(url, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
    toast.success('Order sent to WhatsApp!')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 text-white/60 hover:text-amber-400 text-sm transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Back to Cart
      </Link>

      <h1 className="text-3xl font-bold text-white font-serif mb-8">Checkout</h1>

      {submitted ? (
        <div className="text-center py-16">
          <MessageCircle className="w-16 h-16 text-green-400 mx-auto mb-4" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-white mb-2">Order Sent!</h2>
          <p className="text-white/60 mb-6">
            Your order has been sent to our WhatsApp. We&rsquo;ll confirm
            availability, pricing, and delivery shortly.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-amber-500 text-black font-bold py-3 px-7 rounded hover:bg-amber-400 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} aria-label="Checkout form" className="space-y-4">
            <div className="bg-neutral-900 border border-white/10 rounded-xl p-6 space-y-4">
              <h2 className="text-white font-semibold text-lg">Your Details</h2>

              <div>
                <label htmlFor="co-name" className="block text-sm text-white/70 mb-1">
                  Full Name <span aria-hidden="true" className="text-red-400">*</span>
                </label>
                <input
                  id="co-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  aria-required="true"
                  aria-describedby={errors.name ? 'co-name-err' : undefined}
                  className="w-full px-3 py-2.5 bg-black border border-white/20 rounded text-white text-sm focus:outline-none focus:border-amber-500/60"
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p id="co-name-err" role="alert" className="text-red-400 text-xs mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="co-phone" className="block text-sm text-white/70 mb-1">
                  Phone Number <span aria-hidden="true" className="text-red-400">*</span>
                </label>
                <input
                  id="co-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  aria-required="true"
                  aria-describedby={errors.phone ? 'co-phone-err' : undefined}
                  className="w-full px-3 py-2.5 bg-black border border-white/20 rounded text-white text-sm focus:outline-none focus:border-amber-500/60"
                  placeholder="+256 7XX XXX XXX"
                />
                {errors.phone && (
                  <p id="co-phone-err" role="alert" className="text-red-400 text-xs mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="co-addr" className="block text-sm text-white/70 mb-1">
                  Delivery Address
                </label>
                <textarea
                  id="co-addr"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2.5 bg-black border border-white/20 rounded text-white text-sm focus:outline-none focus:border-amber-500/60 resize-none"
                  placeholder="Street, area, landmark…"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="whatsapp"
              size="lg"
              className="w-full"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              Place Order via WhatsApp
            </Button>
          </form>

          {/* Order Summary */}
          <div className="bg-neutral-900 border border-white/10 rounded-xl p-6 h-fit">
            <h2 className="text-white font-semibold text-lg mb-4">
              Order ({totalItems()} item{totalItems() !== 1 ? 's' : ''})
            </h2>
            <ul className="space-y-3 mb-5">
              {items.map((item) => (
                <li key={item.id} className="flex justify-between text-sm">
                  <span className="text-white/80 truncate mr-2">
                    {item.name} ×{item.quantity}
                  </span>
                  <span className="text-amber-400/70 whitespace-nowrap shrink-0 text-xs italic">
                    Price on request
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between text-white font-semibold">
                <span>Total</span>
                <span className="text-amber-400">Quoted via WhatsApp</span>
              </div>
              <p className="text-white/40 text-xs mt-2">
                Our team will confirm pricing and delivery after you send this order.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
