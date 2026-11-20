// proxy.ts — MUST be named proxy.ts in Next.js 16 (renamed from middleware.ts)
// Place in project root (same level as next.config.ts)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Function MUST be named 'proxy' in Next.js 16 (not 'middleware')
// Note: edge runtime is NOT supported — runs on Node.js only
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Always allow: legal pages, static assets, API routes
  const isPublicPath =
    pathname.startsWith('/privacy-policy') ||
    pathname.startsWith('/terms') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.includes('.')

  if (isPublicPath) return NextResponse.next()

  // Age verification cookie is set client-side by AgeGate component.
  // proxy.ts just ensures the response headers are correct — the
  // AgeGate component handles the display logic and cookie setting.
  const ageVerified = request.cookies.get('kl_age_verified')

  // If not verified, allow the page to load — AgeGate component
  // will overlay the content client-side.
  if (!ageVerified) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|site.webmanifest|images/).*)'],
}
