'use server'
// src/actions/enquiry.ts
import { z } from 'zod'
import { updateTag } from 'next/cache' // stable in Next.js 16

const enquirySchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  customerName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100),
  customerPhone: z
    .string()
    .min(10, 'Enter a valid phone number')
    .max(15)
    .regex(/^[\+\d\s\-()]+$/, 'Enter a valid phone number'),
  quantity: z
    .string()
    .min(1, 'Quantity is required')
    .max(4, 'Quantity seems too large'),
  message: z.string().max(500).optional(),
})

export interface EnquiryFormState {
  success: boolean
  message: string
  whatsappUrl?: string
  errors?: Record<string, string[]>
}

export async function submitEnquiry(
  _prev: EnquiryFormState,
  formData: FormData
): Promise<EnquiryFormState> {
  const parsed = enquirySchema.safeParse({
    productName: formData.get('productName'),
    customerName: formData.get('customerName'),
    customerPhone: formData.get('customerPhone'),
    quantity: formData.get('quantity'),
    message: formData.get('message') ?? '',
  })

  if (!parsed.success) {
    return {
      success: false,
      message: 'Please fix the errors below.',
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  const { productName, customerName, customerPhone, quantity, message } =
    parsed.data

  const whatsappMessage = [
    `*Product Enquiry — Kingsland Distributors*`,
    ``,
    `*Product:* ${productName}`,
    `*Quantity Requested:* ${quantity} bottle(s)`,
    `*Customer:* ${customerName}`,
    `*Phone:* ${customerPhone}`,
    message ? `*Message:* ${message}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '256706119011'
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  // Next.js 16 updateTag — read-your-writes cache invalidation
  updateTag('enquiries')

  return {
    success: true,
    message: 'Your enquiry is ready to send via WhatsApp.',
    whatsappUrl,
  }
}
