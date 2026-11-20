'use client'
// src/components/layout/AgeGate.tsx
import { useEffect, useState } from 'react'
import { analytics } from '@/lib/analytics'

export function AgeGate() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const verified = document.cookie
      .split('; ')
      .find((row) => row.startsWith('kl_age_verified='))
    if (!verified) setShow(true)
  }, [])

  function verify() {
    // Set cookie for 30 days
    const expires = new Date()
    expires.setDate(expires.getDate() + 30)
    document.cookie = `kl_age_verified=1; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
    analytics.ageVerified()
    setShow(false)
  }

  function decline() {
    // Redirect away — user is under 18
    window.location.href = 'https://drinkaware.co.uk'
  }

  if (!show) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
    >
      <div className="max-w-md w-full mx-4 text-center p-8 rounded-2xl border border-amber-500/30 bg-black">
        {/* Crown Icon */}
        <div className="text-5xl mb-4" aria-hidden="true">👑</div>

        <h1
          id="age-gate-title"
          className="text-2xl font-bold text-amber-400 mb-2 font-serif"
        >
          Age Verification
        </h1>
        <p className="text-white/70 mb-1 text-sm">
          Kingsland Distributors sells premium spirits and alcoholic beverages.
        </p>
        <p className="text-white font-semibold mb-6">
          You must be 18 or older to enter this site.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={verify}
            className="flex-1 bg-amber-500 text-black font-bold py-3 px-6 rounded hover:bg-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            I am 18 or older — Enter
          </button>
          <button
            onClick={decline}
            className="flex-1 border border-white/30 text-white/70 font-semibold py-3 px-6 rounded hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            I am under 18 — Exit
          </button>
        </div>

        <p className="mt-4 text-white/40 text-xs">
          By entering you confirm you are of legal drinking age in your country.
          Please drink responsibly.
        </p>
      </div>
    </div>
  )
}
