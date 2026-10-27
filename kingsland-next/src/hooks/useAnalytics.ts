'use client'
// src/hooks/useAnalytics.ts
// Thin hook that re-exports analytics helpers for use in Client Components
import { analytics } from '@/lib/analytics'

export function useAnalytics() {
  return analytics
}
