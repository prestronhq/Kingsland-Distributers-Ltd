// src/types/index.ts
export type { Product } from './product'

export interface FAQ {
  question: string
  answer: string
}

export interface Category {
  slug: string
  name: string
  description: string
  count?: number
}
