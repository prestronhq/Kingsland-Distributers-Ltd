'use client'
// src/components/products/EnquiryForm.tsx
import { useActionState } from 'react'
import { useEffect } from 'react'
import { MessageCircle } from 'lucide-react'
import { submitEnquiry, type EnquiryFormState } from '@/actions/enquiry'
import { analytics } from '@/lib/analytics'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'

interface EnquiryFormProps {
  productName: string
  productSlug: string
}

const initialState: EnquiryFormState = { success: false, message: '' }

export function EnquiryForm({ productName, productSlug }: EnquiryFormProps) {
  const [state, formAction, isPending] = useActionState(
    submitEnquiry,
    initialState
  )

  useEffect(() => {
    if (state.success && state.whatsappUrl) {
      toast.success('Opening WhatsApp with your enquiry…')
      analytics.enquiryFormSubmit(productName)
      window.open(state.whatsappUrl, '_blank', 'noopener,noreferrer')
    } else if (!state.success && state.message && state.message !== '') {
      if (!state.errors) toast.error(state.message)
    }
  }, [state, productName])

  return (
    <form
      id="enquiry"
      action={formAction}
      aria-label={`Enquiry form for ${productName}`}
      className="bg-neutral-900 border border-white/10 rounded-xl p-6 space-y-4"
    >
      <h2 className="text-white font-semibold text-lg">
        Enquire About This Product
      </h2>

      {/* Hidden product name */}
      <input type="hidden" name="productName" value={productName} />

      {/* Customer name */}
      <div>
        <label htmlFor="enq-name" className="block text-sm text-white/70 mb-1">
          Your Name <span aria-hidden="true" className="text-red-400">*</span>
        </label>
        <input
          id="enq-name"
          name="customerName"
          type="text"
          required
          aria-required="true"
          aria-describedby={state.errors?.customerName ? 'enq-name-err' : undefined}
          className="w-full px-3 py-2.5 bg-black border border-white/20 rounded text-white text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60"
          placeholder="Your full name"
        />
        {state.errors?.customerName && (
          <p id="enq-name-err" role="alert" className="text-red-400 text-xs mt-1">
            {state.errors.customerName[0]}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="enq-phone" className="block text-sm text-white/70 mb-1">
          Phone Number <span aria-hidden="true" className="text-red-400">*</span>
        </label>
        <input
          id="enq-phone"
          name="customerPhone"
          type="tel"
          required
          aria-required="true"
          aria-describedby={state.errors?.customerPhone ? 'enq-phone-err' : undefined}
          className="w-full px-3 py-2.5 bg-black border border-white/20 rounded text-white text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60"
          placeholder="+256 7XX XXX XXX"
        />
        {state.errors?.customerPhone && (
          <p id="enq-phone-err" role="alert" className="text-red-400 text-xs mt-1">
            {state.errors.customerPhone[0]}
          </p>
        )}
      </div>

      {/* Quantity */}
      <div>
        <label htmlFor="enq-qty" className="block text-sm text-white/70 mb-1">
          Quantity (bottles) <span aria-hidden="true" className="text-red-400">*</span>
        </label>
        <input
          id="enq-qty"
          name="quantity"
          type="number"
          min="1"
          defaultValue="1"
          required
          aria-required="true"
          aria-describedby={state.errors?.quantity ? 'enq-qty-err' : undefined}
          className="w-full px-3 py-2.5 bg-black border border-white/20 rounded text-white text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60"
        />
        {state.errors?.quantity && (
          <p id="enq-qty-err" role="alert" className="text-red-400 text-xs mt-1">
            {state.errors.quantity[0]}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="enq-msg" className="block text-sm text-white/70 mb-1">
          Additional Message
        </label>
        <textarea
          id="enq-msg"
          name="message"
          rows={3}
          className="w-full px-3 py-2.5 bg-black border border-white/20 rounded text-white text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 resize-none"
          placeholder="Delivery location, special requests…"
        />
      </div>

      <Button
        type="submit"
        variant="whatsapp"
        size="lg"
        loading={isPending}
        className="w-full"
      >
        <MessageCircle className="w-4 h-4" aria-hidden="true" />
        Enquire via WhatsApp
      </Button>
    </form>
  )
}
