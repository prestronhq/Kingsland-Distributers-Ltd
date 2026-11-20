'use server'
// src/actions/contact.ts
import { z } from 'zod'
import { updateTag } from 'next/cache' // stable in Next.js 16

const contactSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(100),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must not exceed 1000 characters'),
})

export interface ContactFormState {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot: bot protection
  if (formData.get('website')) {
    return { success: false, message: 'Submission rejected.' }
  }

  const parsed = contactSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  })

  if (!parsed.success) {
    return {
      success: false,
      message: 'Please fix the errors below.',
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    // TODO: Send via Resend when RESEND_API_KEY is set
    // const { Resend } = await import('resend')
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'noreply@kingslanduganda.com',
    //   to: process.env.CONTACT_EMAIL ?? 'kingslanddistributors.ug@gmail.com',
    //   subject: `Contact Form: ${parsed.data.subject}`,
    //   text: `From: ${parsed.data.firstName} ${parsed.data.lastName} <${parsed.data.email}>\n\n${parsed.data.message}`,
    // })

    // Next.js 16 updateTag — read-your-writes cache invalidation
    updateTag('contact-submissions')

    return {
      success: true,
      message: "Thank you! We'll be in touch within 24 hours.",
    }
  } catch {
    return {
      success: false,
      message:
        'Something went wrong. Please try again or contact us via WhatsApp.',
    }
  }
}
