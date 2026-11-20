// src/types/product.ts
export interface Product {
  id: number
  slug: string
  name: string
  brand: string
  category: string
  image: string
  altText: string
  origin: string
  abv: string
  volume: string
  description: string
  longDescription: string
  price?: number // UGX — undefined = "Contact for Price"
  priceFormatted: string
  badge?: 'Best Seller' | 'Limited Edition' | 'New Arrival'
  availability: 'in_stock' | 'limited' | 'enquire'
}
