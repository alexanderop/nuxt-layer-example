/**
 * Products feature types
 *
 * Note: The Product type itself is in app/types/product.ts (shared layer)
 * This file contains feature-specific types for filtering and sorting
 */

import type { ProductCategory } from '~/types/product'

/**
 * Product filter criteria
 */
export interface ProductFilter {
  /** Search query (matches name or description) */
  search?: string

  /** Filter by category */
  category?: ProductCategory | 'all'

  /** Filter by price range */
  priceRange?: {
    min: number
    max: number
  }

  /** Filter by minimum rating */
  minRating?: number

  /** Show only in-stock items */
  inStock?: boolean
}

/**
 * Product sort options
 */
export type ProductSort =
  | 'name-asc'
  | 'name-desc'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'
