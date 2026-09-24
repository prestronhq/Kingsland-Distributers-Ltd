// src/lib/categories.ts
import type { Category } from '@/types'

export const categories: Category[] = [
  {
    slug: 'whisky',
    name: 'Whisky',
    description:
      'Discover our collection of premium Scotch whiskies, from rich single malts to iconic blends. Sourced from the finest distilleries in Scotland and beyond.',
  },
  {
    slug: 'whiskey',
    name: 'Whiskey',
    description:
      'Explore American Tennessee whiskeys and Irish whiskeys — smooth, approachable, and perfect for any occasion.',
  },
  {
    slug: 'cognac',
    name: 'Cognac',
    description:
      'The finest cognacs from the great Champagne crus of France — Hennessy, Martell, and Rémy Martin.',
  },
  {
    slug: 'champagne',
    name: 'Champagne',
    description:
      'Celebrate with authentic French Champagne from Moët & Chandon, Veuve Clicquot, and more.',
  },
  {
    slug: 'vodka',
    name: 'Vodka',
    description:
      'Ultra-premium vodkas for discerning palates. Grey Goose and the finest French distillations.',
  },
  {
    slug: 'gin',
    name: 'Gin',
    description:
      'Classic London Dry Gins and contemporary botanical expressions for the perfect G&T.',
  },
  {
    slug: 'tequila',
    name: 'Tequila',
    description:
      "Premium Mexican tequilas from the highlands of Jalisco — from everyday cocktail mixers to collector's ceramics.",
  },
  {
    slug: 'rum',
    name: 'Rum',
    description:
      'Caribbean rums from the most iconic distilleries — light, aged, and spiced.',
  },
  {
    slug: 'liqueur',
    name: 'Liqueur',
    description:
      'Sweet, flavourful liqueurs perfect for sipping, mixing, and cocktail creation.',
  },
  {
    slug: 'sparkling-wine',
    name: 'Sparkling Wine',
    description:
      'Elegant sparkling wines for every celebration — from Champagne alternatives to ice-style wines.',
  },
  {
    slug: 'wine',
    name: 'Wine',
    description:
      'Selected wines from the finest producing regions — South Africa, France, and beyond.',
  },
  {
    slug: 'still-wine',
    name: 'Still Wine',
    description:
      'Award-winning still wines for everyday enjoyment and special occasions.',
  },
  {
    slug: 'beer',
    name: 'Beer',
    description:
      'World-class premium lagers and craft beers from iconic international brands.',
  },
  {
    slug: 'cider',
    name: 'Cider',
    description: 'Crisp, refreshing premium ciders — best served chilled.',
  },
  {
    slug: 'energy-drink',
    name: 'Energy Drink',
    description:
      'High-energy drinks — perfect as a mixer or standalone refreshment.',
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getAllCategorySlugs(): string[] {
  return categories.map((c) => c.slug)
}
