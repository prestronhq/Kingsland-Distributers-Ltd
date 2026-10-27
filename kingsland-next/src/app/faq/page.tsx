'use client'
// src/app/faq/page.tsx
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqs } from '@/lib/faq'
import { cn } from '@/lib/utils'

// JSON-LD for FAQ page
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white font-serif mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-white/60">
            Common questions about ordering, delivery, products, and more.
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            const id = `faq-${index}`
            const panelId = `faq-panel-${index}`
            return (
              <div
                key={index}
                className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden hover:border-amber-500/20 transition-colors"
              >
                <button
                  id={id}
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-500/60"
                >
                  <span className="text-white font-medium text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-amber-400 shrink-0 transition-transform duration-200',
                      isOpen && 'rotate-180'
                    )}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={id}
                    className="px-5 pb-5"
                  >
                    <p className="text-white/70 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-2">Still have questions?</h2>
          <p className="text-white/60 text-sm mb-4">
            Contact us directly — we respond within a few hours during business
            hours.
          </p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '256706119011'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold py-2.5 px-5 rounded hover:bg-green-500 transition-colors text-sm"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}
