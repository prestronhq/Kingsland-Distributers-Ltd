'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'

const heroImages = [
  'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=1200&q=75',
  'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=1200&q=75',
  'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=75',
]

const taglines = [
  "The World's Finest Spirits, Delivered to You",
  'Premium Whiskies & Cognacs in Kampala',
  'Authentic. Premium. Delivered.',
]

interface HeroSectionProps {
  whatsappNumber: string
}

export function HeroSection({ whatsappNumber }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Detect prefers-reduced-motion on mount
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }
    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [])

  // Cycle through images/taglines every 3 seconds unless reduced motion
  useEffect(() => {
    if (reducedMotion) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length)
    }, 3000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [reducedMotion])

  return (
    <section
      className="relative min-h-[85vh] flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Crossfading background images */}
      {heroImages.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${src}')`,
            opacity: i === activeIndex ? 1 : 0,
            transition: reducedMotion ? 'none' : 'opacity 1s ease-in-out',
          }}
          aria-hidden="true"
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />

      {/* Decorative gold gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Kampala&rsquo;s Premier Spirits Distributor
          </p>

          {/* Crossfading taglines */}
          <div className="relative mb-6" style={{ minHeight: '1em' }}>
            {taglines.map((tagline, i) => (
              <h1
                key={tagline}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight font-serif"
                style={{
                  position: i === 0 ? 'relative' : 'absolute',
                  top: i === 0 ? undefined : 0,
                  left: i === 0 ? undefined : 0,
                  right: i === 0 ? undefined : 0,
                  opacity: i === activeIndex ? 1 : 0,
                  transition: reducedMotion ? 'none' : 'opacity 1s ease-in-out',
                  pointerEvents: i === activeIndex ? 'auto' : 'none',
                }}
                aria-hidden={i !== activeIndex}
              >
                {/* Highlight the word "Spirits" in first tagline, or first word in others */}
                {i === 0 ? (
                  <>
                    The World&rsquo;s Finest{' '}
                    <span className="text-amber-400">Spirits</span>,
                    <br />
                    Delivered to You
                  </>
                ) : i === 1 ? (
                  <>
                    Premium{' '}
                    <span className="text-amber-400">Whiskies & Cognacs</span>
                    <br />
                    in Kampala
                  </>
                ) : (
                  <>
                    <span className="text-amber-400">Authentic.</span> Premium.
                    Delivered.
                  </>
                )}
              </h1>
            ))}
          </div>

          <p className="text-white/70 text-lg mb-8 leading-relaxed">
            Premium whiskies, cognacs, champagnes and more — sourced
            authentically and delivered across Kampala. Over 31 world-class
            products from the most celebrated distilleries.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 text-black font-bold py-3.5 px-7 rounded hover:bg-amber-400 transition-colors"
            >
              Explore Our Collection
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3.5 px-7 rounded hover:bg-green-500 transition-colors"
              aria-label="Order via WhatsApp"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              Order via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
