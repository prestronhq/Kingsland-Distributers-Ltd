// src/app/about/page.tsx
import type { Metadata } from 'next'
import { Crown, Shield, Award, Globe } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us | Our Story',
  description:
    'Founded in 2010, Kingsland Distributors has been bringing the world\'s finest spirits to Uganda. Learn about our story, values, and commitment to authenticity.',
  alternates: { canonical: 'https://kingslanduganda.com/about' },
}

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/20 rounded-full mb-5">
          <Crown className="w-8 h-8 text-amber-400" aria-hidden="true" />
        </div>
        <h1 className="text-4xl font-bold text-white font-serif mb-4">
          About Kingsland Distributors
        </h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
          Uganda&rsquo;s trusted partner for premium spirits since 2010 — bringing
          world-class brands to discerning customers across the country.
        </p>
      </div>

      {/* Our Story */}
      <section className="mb-14" aria-labelledby="story-heading">
        <h2 id="story-heading" className="text-2xl font-bold text-white font-serif mb-4">
          Our Story
        </h2>
        <div className="prose prose-invert max-w-none space-y-4">
          <p className="text-white/70 leading-relaxed">
            Founded in 2010 and headquartered at 6th Street Industrial Area,
            Kampala, Kingsland Distributors Ltd was established with a clear
            purpose: to make the world&rsquo;s most celebrated spirits accessible to
            Ugandans who demand only the best.
          </p>
          <p className="text-white/70 leading-relaxed">
            Over the past 15 years, we have built strong, direct relationships
            with authorised distributors and official brand representatives
            across the globe — guaranteeing that every product in our range is
            100% authentic, traceable, and of the highest quality.
          </p>
          <p className="text-white/70 leading-relaxed">
            From iconic Scotch whiskies like Johnnie Walker and Chivas Regal, to
            distinguished cognacs, champagnes, vodkas, and more — our range of
            31+ products represents the finest the world has to offer.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mb-14" aria-labelledby="values-heading">
        <h2 id="values-heading" className="text-2xl font-bold text-white font-serif mb-6">
          Our Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              Icon: Shield,
              title: 'Authenticity',
              description:
                'Every product is sourced through authorised channels. We carry documentation to prove provenance on request.',
            },
            {
              Icon: Award,
              title: 'Excellence',
              description:
                'We curate only premium products — every brand in our range is a market leader in its category.',
            },
            {
              Icon: Globe,
              title: 'Responsibility',
              description:
                'We promote responsible drinking and enforce strict age verification. We never sell to anyone under 18.',
            },
          ].map(({ Icon, title, description }) => (
            <div
              key={title}
              className="bg-neutral-900 border border-white/10 rounded-xl p-6"
            >
              <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-amber-400" aria-hidden="true" />
              </div>
              <h3 className="text-white font-semibold mb-2">{title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Facts */}
      <section className="mb-14 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white font-serif mb-6 text-center">
          Kingsland in Numbers
        </h2>
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { dt: 'Founded', dd: '2010' },
            { dt: 'Premium Products', dd: '31+' },
            { dt: 'Categories', dd: '15' },
            { dt: 'Years of Excellence', dd: '15+' },
          ].map(({ dt, dd }) => (
            <div key={dt}>
              <dt className="text-white/60 text-sm">{dt}</dt>
              <dd className="text-amber-400 text-3xl font-bold mt-1">{dd}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white font-serif mb-3">
          Ready to Explore Our Range?
        </h2>
        <p className="text-white/60 mb-6">
          Browse 31+ premium spirits and order instantly via WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center bg-amber-500 text-black font-bold py-3 px-7 rounded hover:bg-amber-400 transition-colors"
          >
            Browse Products
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border border-amber-500/40 text-amber-400 font-semibold py-3 px-7 rounded hover:bg-amber-500/10 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  )
}
