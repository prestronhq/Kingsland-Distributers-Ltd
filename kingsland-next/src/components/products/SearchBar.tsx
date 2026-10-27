'use client'
// src/components/products/SearchBar.tsx
import { useCallback, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { analytics } from '@/lib/analytics'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search products…',
}: SearchBarProps) {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      onChange(newValue)

      // Debounce analytics call
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        if (newValue.trim().length >= 2) {
          analytics.searchQuery(newValue.trim())
        }
      }, 300)
    },
    [onChange]
  )

  function handleClear() {
    onChange('')
  }

  return (
    <div className="relative">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Search products"
        className="w-full pl-9 pr-9 py-2.5 bg-neutral-900 border border-white/20 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-amber-500/60 transition-colors"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
