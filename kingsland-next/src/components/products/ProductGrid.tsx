// src/components/products/ProductGrid.tsx
import { ProductCard } from './ProductCard'
import type { Product } from '@/lib/products'

interface ProductGridProps {
  products: Product[]
  emptyMessage?: string
}

export function ProductGrid({
  products,
  emptyMessage = 'No products found.',
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-white/50">
        <p className="text-lg">{emptyMessage}</p>
        <p className="text-sm mt-1">Try clearing your filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
