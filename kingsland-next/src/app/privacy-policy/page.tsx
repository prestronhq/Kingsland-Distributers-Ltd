// src/app/privacy-policy/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Kingsland Distributors collects, uses, and protects your personal data.',
  alternates: { canonical: 'https://kingslanduganda.com/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-4xl font-bold text-white font-serif mb-2">
        Privacy Policy
      </h1>
      <p className="text-white/50 text-sm mb-10">
        Last updated: October 2026
      </p>

      <div className="prose prose-invert prose-sm max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">1. Who We Are</h2>
          <p className="text-white/70 leading-relaxed">
            Kingsland Distributors Ltd (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a premium spirits
            distributor based at 6th Street Industrial Area, Kampala, Uganda.
            Website:{' '}
            <a
              href="https://kingslanduganda.com"
              className="text-amber-400 hover:text-amber-300"
            >
              kingslanduganda.com
            </a>
            . Contact:{' '}
            <a
              href="mailto:kingslanddistributors.ug@gmail.com"
              className="text-amber-400 hover:text-amber-300"
            >
              kingslanddistributors.ug@gmail.com
            </a>{' '}
            | +256 757 042 420
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">2. What We Collect</h2>
          <ul className="text-white/70 space-y-2 list-disc list-inside">
            <li>
              <strong className="text-white/90">Direct from you:</strong> Name, email,
              phone number, delivery address (checkout/contact form).
            </li>
            <li>
              <strong className="text-white/90">Automatically:</strong> Anonymised usage
              data (pages visited, device type) via Google Analytics 4 — only if you
              consent to analytics cookies.
            </li>
            <li>
              <strong className="text-white/90">We do NOT collect:</strong> Payment card
              information, passwords, or data from anyone under 18.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">3. How We Use It</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white/70 border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-4 text-white/90">Purpose</th>
                  <th className="text-left py-2 text-white/90">Legal Basis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  ['Order processing', 'Performance of contract'],
                  ['Customer support replies', 'Legitimate interest'],
                  ['Anonymised analytics', 'Your consent'],
                  ['Site improvement', 'Legitimate interest'],
                ].map(([purpose, basis]) => (
                  <tr key={purpose}>
                    <td className="py-2 pr-4">{purpose}</td>
                    <td className="py-2">{basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">4. Who We Share With</h2>
          <p className="text-white/70 leading-relaxed mb-2">
            Google Analytics (anonymised, consent-gated) | WhatsApp/Meta (order
            messages) | Resend (contact form emails) | Vercel (hosting infrastructure)
          </p>
          <p className="text-white/70 font-medium">We NEVER sell your data.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">5. Data Retention</h2>
          <ul className="text-white/70 space-y-1 list-disc list-inside">
            <li>Contact form emails: ~3 years standard business practice</li>
            <li>WhatsApp orders: Subject to WhatsApp&apos;s own retention</li>
            <li>GA4 data: 14 months (standard default)</li>
            <li>Age verification cookie: 30 days</li>
            <li>Cookie consent cookie: 365 days</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">6. Cookies</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-white/70 border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-3 text-white/90">Cookie</th>
                  <th className="text-left py-2 pr-3 text-white/90">Type</th>
                  <th className="text-left py-2 text-white/90">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  ['kl_age_verified', 'Strictly Necessary', '30 days'],
                  ['kl_consent', 'Strictly Necessary', '365 days'],
                  ['kingsland-cart', 'Strictly Necessary', 'LocalStorage'],
                  ['kingsland-wishlist', 'Strictly Necessary', 'LocalStorage'],
                  ['_ga, _ga_*', 'Analytics (consent only)', '2 years'],
                ].map(([name, type, duration]) => (
                  <tr key={name}>
                    <td className="py-2 pr-3 font-mono">{name}</td>
                    <td className="py-2 pr-3">{type}</td>
                    <td className="py-2">{duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-white/50 text-xs mt-3">
            Manage cookies: Click &ldquo;Cookie Settings&rdquo; in the footer at any time.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">7. Your Rights</h2>
          <p className="text-white/70 leading-relaxed">
            You have the right to: access, correct, or delete your data; withdraw
            analytics consent; object to legitimate interest processing. Email{' '}
            <a
              href="mailto:kingslanddistributors.ug@gmail.com"
              className="text-amber-400 hover:text-amber-300"
            >
              kingslanddistributors.ug@gmail.com
            </a>{' '}
            — we respond within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">8. Children</h2>
          <p className="text-white/70 leading-relaxed">
            This site is strictly for adults aged 18+. Age gate enforced on all
            pages. Contact us immediately if a minor has submitted any data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">9. Changes</h2>
          <p className="text-white/70 leading-relaxed">
            The &ldquo;Last updated&rdquo; date at the top of this page reflects all changes.
            Review this page periodically.
          </p>
        </section>
      </div>
    </div>
  )
}
