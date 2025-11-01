/**
 * Shared Product type used across multiple features
 *
 * This demonstrates the shared layer in feature-based architecture:
 * - Both products and cart features can import this type
 * - Features remain decoupled while sharing a common data contract
 */

/**
 * Product category
 */
export type ProductCategory = 'electronics' | 'clothing' | 'books' | 'home' | 'sports'

/**
 * Product entity representing a catalog item
 */
export interface Product {
  /** Unique product identifier */
  id: string

  /** Product name */
  name: string

  /** Product description */
  description: string

  /** Price in USD cents (e.g., 1999 = $19.99) */
  price: number

  /** Product category */
  category: ProductCategory

  /** Product image URL */
  image: string

  /** Available stock quantity */
  stock: number

  /** Product rating (0-5) */
  rating?: number
}
