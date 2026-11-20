// src/app/terms/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Terms of sale and service for Kingsland Distributors Ltd. Age restriction, ordering, payment, delivery and returns.',
  alternates: { canonical: 'https://kingslanduganda.com/terms' },
}

const sections = [
  {
    heading: '1. Acceptance',
    body: 'Using kingslanduganda.com constitutes acceptance of these Terms & Conditions in full.',
  },
  {
    heading: '2. Age Restriction',
    body: 'You must be 18 years of age or older to purchase alcoholic beverages. We verify age at delivery and reserve the right to refuse delivery if this cannot be confirmed.',
  },
  {
    heading: '3. Products',
    body: 'Product descriptions and images are accurate to the best of our ability. Images are representative. ABV is approximate. Availability is subject to change without notice.',
  },
  {
    heading: '4. Pricing',
    body: 'Prices are in Uganda Shillings (UGX) where shown. "Contact for Price" items require a direct enquiry. Prices may change without notice. The price agreed via WhatsApp at order confirmation is the binding price.',
  },
  {
    heading: '5. Ordering',
    body: 'Proceeding to WhatsApp checkout is an expression of interest to purchase. A contract is formed only when we confirm order, price, quantity, and delivery via WhatsApp. We reserve the right to refuse any order.',
  },
  {
    heading: '6. Payment',
    body: 'We accept: Cash on Delivery (within Kampala), MTN Mobile Money, Airtel Money, and bank transfer. Payment terms are confirmed at order confirmation.',
  },
  {
    heading: '7. Delivery',
    body: 'Standard delivery covers Kampala Metropolitan Area. Deliveries to other areas are by arrangement. An adult aged 18+ must be present to receive the order. Delivery timelines are estimates and not guaranteed.',
  },
  {
    heading: '8. Returns',
    body: 'We accept returns of unopened, undamaged products in original packaging within 48 hours of delivery, only if the product was damaged in transit or the wrong item was delivered. Refunds are processed within 7 business days. Contact us via WhatsApp with photographic evidence within 48 hours of delivery.',
  },
  {
    heading: '9. Responsible Drinking',
    body: 'We promote responsible alcohol consumption. Do not drink and drive. Drink in moderation. If you or someone you know needs support, please contact a local support organisation.',
  },
  {
    heading: '10. Intellectual Property',
    body: 'All content on this website including text, images, graphics, and branding is the intellectual property of Kingsland Distributors Ltd. Reproduction without written permission is prohibited.',
  },
  {
    heading: '11. Liability',
    body: 'Our liability is limited to the value of the product in question. We accept no liability for indirect, consequential, or incidental losses arising from the use of this website or our products.',
  },
  {
    heading: '12. Governing Law',
    body: 'These Terms are governed by the laws of the Republic of Uganda. Any disputes shall be subject to the exclusive jurisdiction of the courts of Uganda.',
  },
  {
    heading: '13. Changes to These Terms',
    body: 'We reserve the right to update these Terms at any time. Continued use of the website following any change constitutes acceptance of the updated Terms.',
  },
  {
    heading: '14. Contact',
    body: '6th Street Industrial Area, Kampala, Uganda | kingslanddistributors.ug@gmail.com | +256 757 042 420',
  },
]

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-4xl font-bold text-white font-serif mb-2">
        Terms &amp; Conditions
      </h1>
      <p className="text-white/50 text-sm mb-10">Last updated: October 2026</p>

      <div className="space-y-8">
        {sections.map(({ heading, body }) => (
          <section key={heading}>
            <h2 className="text-lg font-semibold text-white mb-2">{heading}</h2>
            <p className="text-white/70 leading-relaxed text-sm">{body}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
