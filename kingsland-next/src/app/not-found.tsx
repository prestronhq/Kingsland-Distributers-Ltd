// src/app/not-found.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { Crown, ArrowLeft, ShoppingBag, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
}

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6">
      <div className="text-center max-w-md">
        {/* Crown icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
          <Crown className="w-10 h-10 text-amber-400" aria-hidden="true" />
        </div>

        <p className="text-amber-400 text-6xl font-bold mb-4" aria-label="Error 404">
          404
        </p>
        <h1 className="text-2xl font-bold text-white font-serif mb-3">
          Page Not Found
        </h1>
        <p className="text-white/60 mb-8 leading-relaxed">
          The page you&rsquo;re looking for doesn&rsquo;t exist, or may have been moved.
          Let us help you find what you&rsquo;re after.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-amber-500 text-black font-bold py-3 px-6 rounded hover:bg-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Home
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 border border-amber-500/40 text-amber-400 font-semibold py-3 px-6 rounded hover:bg-amber-500/10 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            Browse Collection
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 text-white/60 hover:text-white font-medium py-3 px-6 rounded hover:bg-white/5 transition-colors"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
