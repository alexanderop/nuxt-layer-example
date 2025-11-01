/**
 * Cart feature types
 *
 * Note: Uses the shared Product type from app/types/product.ts
 * This demonstrates how features can depend on shared types without coupling to other features
 */

import type { Product } from '~/types/product'

/**
 * Cart item (product + quantity)
 */
export interface CartItem {
  /** Product reference */
  product: Product

  /** Quantity in cart */
  quantity: number

  /** Item subtotal (price * quantity) */
  subtotal: number
}

/**
 * Cart state
 */
export interface Cart {
  /** Cart items */
  items: CartItem[]

  /** Total number of items */
  itemCount: number

  /** Subtotal (sum of all item subtotals) */
  subtotal: number

  /** Tax amount (10% of subtotal) */
  tax: number

  /** Total (subtotal + tax) */
  total: number
}
