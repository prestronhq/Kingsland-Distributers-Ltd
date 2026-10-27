'use client'
// src/components/ui/CookieBanner.tsx
import { useEffect, useState } from 'react'
import { analytics } from '@/lib/analytics'

type ConsentState = 'pending' | 'accepted' | 'rejected'

export function CookieBanner() {
  const [state, setState] = useState<ConsentState | null>(null)
  const [showManage, setShowManage] = useState(false)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('kl_consent')
    if (consent) {
      setState(consent as ConsentState)
    } else {
      setState('pending')
    }
  }, [])

  function acceptAll() {
    localStorage.setItem('kl_consent', 'accepted')
    document.cookie = 'kl_consent=accepted; max-age=31536000; path=/; SameSite=Lax'
    analytics.cookieConsent('accepted')
    setState('accepted')
    // Reload to initialise GA4
    window.location.reload()
  }

  function rejectNonEssential() {
    localStorage.setItem('kl_consent', 'rejected')
    document.cookie = 'kl_consent=rejected; max-age=31536000; path=/; SameSite=Lax'
    analytics.cookieConsent('rejected')
    setState('rejected')
  }

  function savePreferences() {
    const type = analyticsEnabled ? 'partial' : 'rejected'
    localStorage.setItem('kl_consent', type)
    document.cookie = `kl_consent=${type}; max-age=31536000; path=/; SameSite=Lax`
    analytics.cookieConsent(type)
    setState(type as ConsentState)
    if (analyticsEnabled) window.location.reload()
  }

  if (state !== 'pending') return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-neutral-900 border-t border-amber-500/20 shadow-2xl"
    >
      <div className="max-w-5xl mx-auto">
        {!showManage ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-white/80 text-sm flex-1">
              We use cookies to improve your experience. Analytics cookies are
              only set with your consent.{' '}
              <a
                href="/privacy-policy"
                className="text-amber-400 underline hover:text-amber-300"
              >
                Privacy Policy
              </a>
            </p>
            <div className="flex flex-wrap gap-2 shrink-0">
              <button
                onClick={() => setShowManage(true)}
                className="text-sm text-white/60 underline hover:text-white/80"
              >
                Manage
              </button>
              <button
                onClick={rejectNonEssential}
                className="text-sm border border-white/30 text-white/70 px-3 py-1.5 rounded hover:bg-white/5"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={acceptAll}
                className="text-sm bg-amber-500 text-black font-semibold px-3 py-1.5 rounded hover:bg-amber-400"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-white font-semibold">Cookie Preferences</p>
            <div className="flex items-center justify-between py-2 border-b border-white/10">
              <div>
                <p className="text-white/90 text-sm font-medium">
                  Strictly Necessary
                </p>
                <p className="text-white/50 text-xs">
                  Age gate, cart, wishlist — always active
                </p>
              </div>
              <span className="text-green-400 text-xs font-semibold">Always On</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-white/10">
              <div>
                <p className="text-white/90 text-sm font-medium">Analytics</p>
                <p className="text-white/50 text-xs">
                  Google Analytics — helps us improve the site
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  aria-label="Enable analytics cookies"
                />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-amber-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500" />
              </label>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowManage(false)}
                className="text-sm text-white/60 hover:text-white underline"
              >
                Back
              </button>
              <button
                onClick={savePreferences}
                className="text-sm bg-amber-500 text-black font-semibold px-4 py-1.5 rounded hover:bg-amber-400 ml-auto"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
