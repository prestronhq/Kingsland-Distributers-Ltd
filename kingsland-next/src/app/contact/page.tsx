'use client'
// src/app/contact/page.tsx — uses client for useActionState
import { useActionState, useEffect } from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react'
import { submitContactForm, type ContactFormState } from '@/actions/contact'
import { analytics } from '@/lib/analytics'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'

const initialState: ContactFormState = { success: false, message: '' }

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Kingsland Distributors Ltd',
  description: "Uganda's premier distributor of premium spirits and beverages.",
  url: 'https://kingslanduganda.com',
  telephone: '+256757042420',
  email: 'kingslanddistributors.ug@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '6th Street Industrial Area',
    addressLocality: 'Kampala',
    addressCountry: 'UG',
  },
  openingHours: 'Mo-Fr 09:00-18:00',
  priceRange: '$$',
}

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  )

  useEffect(() => {
    if (state.success) {
      toast.success(state.message)
      analytics.contactFormSubmit()
    }
  }, [state.success, state.message])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white font-serif mb-3">
            Contact Us
          </h1>
          <p className="text-white/60 text-lg">
            We&rsquo;re here to help. Reach out via WhatsApp, phone, email, or the
            form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-neutral-900 border border-white/10 rounded-xl p-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-amber-400" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-white font-semibold mb-1">Phone</h2>
                  <a
                    href="tel:+256757042420"
                    onClick={() => analytics.phoneDialClick()}
                    className="text-amber-400 hover:text-amber-300 transition-colors block"
                  >
                    +256 757 042 420
                  </a>
                  <a
                    href="tel:+256782100805"
                    onClick={() => analytics.phoneDialClick()}
                    className="text-amber-400 hover:text-amber-300 transition-colors block"
                  >
                    +256 782 100 805
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-green-400" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-white font-semibold mb-1">WhatsApp</h2>
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '256706119011'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => analytics.whatsappClick()}
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    +256 706 119 011
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-amber-400" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-white font-semibold mb-1">Email</h2>
                  <a
                    href="mailto:kingslanddistributors.ug@gmail.com"
                    onClick={() => analytics.emailClick()}
                    className="text-amber-400 hover:text-amber-300 transition-colors break-all"
                  >
                    kingslanddistributors.ug@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-amber-400" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-white font-semibold mb-1">Address</h2>
                  <p className="text-white/60 text-sm leading-relaxed">
                    6th Street Industrial Area<br />
                    Kampala, Uganda
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-amber-400" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-white font-semibold mb-1">Business Hours</h2>
                  <p className="text-white/60 text-sm">
                    Monday – Friday: 9:00 AM – 6:00 PM EAT<br />
                    Saturday: 9:00 AM – 1:00 PM EAT
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps embed placeholder */}
            <div className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden aspect-video">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.745577773407!2d32.5817!3d0.3131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMCvCsDE4JzQ3LjIiTiAzMsKwMzQnNTQuMiJF!5e0!3m2!1sen!2sug!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kingsland Distributors location on Google Maps"
              />
            </div>
          </div>

          {/* Contact Form */}
          <form
            action={formAction}
            aria-label="Contact form"
            className="bg-neutral-900 border border-white/10 rounded-xl p-6 space-y-4"
          >
            <h2 className="text-white font-semibold text-xl">Send a Message</h2>

            {/* Honeypot */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              aria-hidden="true"
              className="hidden"
              autoComplete="off"
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm text-white/70 mb-1">
                  First Name <span aria-hidden="true" className="text-red-400">*</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  aria-required="true"
                  aria-describedby={state.errors?.firstName ? 'fn-err' : undefined}
                  className="w-full px-3 py-2.5 bg-black border border-white/20 rounded text-white text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60"
                />
                {state.errors?.firstName && (
                  <p id="fn-err" role="alert" className="text-red-400 text-xs mt-1">
                    {state.errors.firstName[0]}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm text-white/70 mb-1">
                  Last Name <span aria-hidden="true" className="text-red-400">*</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  aria-required="true"
                  aria-describedby={state.errors?.lastName ? 'ln-err' : undefined}
                  className="w-full px-3 py-2.5 bg-black border border-white/20 rounded text-white text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60"
                />
                {state.errors?.lastName && (
                  <p id="ln-err" role="alert" className="text-red-400 text-xs mt-1">
                    {state.errors.lastName[0]}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-white/70 mb-1">
                Email <span aria-hidden="true" className="text-red-400">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                aria-required="true"
                aria-describedby={state.errors?.email ? 'email-err' : undefined}
                className="w-full px-3 py-2.5 bg-black border border-white/20 rounded text-white text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60"
              />
              {state.errors?.email && (
                <p id="email-err" role="alert" className="text-red-400 text-xs mt-1">
                  {state.errors.email[0]}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm text-white/70 mb-1">
                Subject <span aria-hidden="true" className="text-red-400">*</span>
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                aria-required="true"
                aria-describedby={state.errors?.subject ? 'subj-err' : undefined}
                className="w-full px-3 py-2.5 bg-black border border-white/20 rounded text-white text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60"
              />
              {state.errors?.subject && (
                <p id="subj-err" role="alert" className="text-red-400 text-xs mt-1">
                  {state.errors.subject[0]}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-white/70 mb-1">
                Message <span aria-hidden="true" className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                aria-required="true"
                aria-describedby={state.errors?.message ? 'msg-err' : undefined}
                className="w-full px-3 py-2.5 bg-black border border-white/20 rounded text-white text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 resize-none"
                placeholder="How can we help you?"
              />
              {state.errors?.message && (
                <p id="msg-err" role="alert" className="text-red-400 text-xs mt-1">
                  {state.errors.message[0]}
                </p>
              )}
            </div>

            {state.success && (
              <p role="status" className="text-green-400 text-sm">
                {state.message}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isPending}
              className="w-full"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
