'use client'
// src/store/wishlistStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/lib/products'

interface WishlistStore {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  toggle: (product: Product) => boolean
  isInWishlist: (productId: number) => boolean
  count: () => number
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        if (!get().isInWishlist(product.id)) {
          set((s) => ({ items: [...s.items, product] }))
        }
      },

      removeItem: (productId) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== productId) })),

      toggle: (product) => {
        if (get().isInWishlist(product.id)) {
          get().removeItem(product.id)
          return false
        }
        get().addItem(product)
        return true
      },

      isInWishlist: (productId) => get().items.some((i) => i.id === productId),

      count: () => get().items.length,
    }),
    { name: 'kingsland-wishlist' }
  )
)
