'use client'
// src/components/products/ProductFilters.tsx
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback, useTransition } from 'react'
import { Search, X } from 'lucide-react'
import { analytics } from '@/lib/analytics'
import { cn } from '@/lib/utils'

interface ProductFiltersProps {
  categories: string[]
  selectedCategory?: string
  searchQuery?: string
  totalCount: number
  filteredCount: number
}

export function ProductFilters({
  categories,
  selectedCategory,
  searchQuery,
  totalCount,
  filteredCount,
}: ProductFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`)
      })
    },
    [router, pathname, searchParams]
  )

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    updateParam('q', value || null)
    if (value.length >= 2) analytics.searchQuery(value)
  }

  function handleCategory(slug: string) {
    const newCat = selectedCategory === slug ? null : slug
    updateParam('category', newCat)
    if (newCat) analytics.categoryFilter(newCat)
  }

  function clearAll() {
    startTransition(() => {
      router.push(pathname)
    })
  }

  return (
    <div className="space-y-4 mb-6">
      {/* Search */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Search products…"
          defaultValue={searchQuery}
          onChange={handleSearch}
          aria-label="Search products"
          className="w-full pl-9 pr-4 py-2.5 bg-neutral-900 border border-white/10 rounded-lg text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50"
        />
      </div>

      {/* Category tabs */}
      <div
        className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar"
        role="group"
        aria-label="Filter by category"
      >
        <button
          onClick={() => updateParam('category', null)}
          className={cn(
            'shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400',
            !selectedCategory
              ? 'bg-amber-500 text-black'
              : 'bg-neutral-800 text-white/70 hover:bg-neutral-700'
          )}
        >
          All ({totalCount})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            aria-pressed={selectedCategory === cat}
            className={cn(
              'shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400',
              selectedCategory === cat
                ? 'bg-amber-500 text-black'
                : 'bg-neutral-800 text-white/70 hover:bg-neutral-700'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Active filter chips + count */}
      <div className="flex items-center justify-between">
        <p className="text-white/50 text-sm" aria-live="polite">
          {isPending ? 'Filtering…' : `Showing ${filteredCount} of ${totalCount} products`}
        </p>
        {(selectedCategory || searchQuery) && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition-colors"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
            Clear all
          </button>
        )}
      </div>
    </div>
  )
}
