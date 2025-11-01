import { z } from 'zod'
import { ProductSchema } from '~/shared/schemas/product'

/**
 * Cart Schemas with Runtime Validation
 *
 * Validates cart items and ensures:
 * - Quantities are positive integers
 * - Subtotals are correctly calculated
 * - All cart data is valid before persisting to localStorage
 */

/**
 * Cart item schema - validates product, quantity, and subtotal
 */
export const CartItemSchema = z.object({
  /** Product reference - must be a valid Product */
  product: ProductSchema,

  /** Quantity - must be positive integer */
  quantity: z.number().int('Quantity must be an integer').positive('Quantity must be greater than 0'),

  /** Subtotal - must be non-negative (price * quantity in cents) */
  subtotal: z.number().int('Subtotal must be an integer').nonnegative('Subtotal cannot be negative'),
})
  // Add custom validation to ensure subtotal matches calculation
  .refine(
    (data) => data.subtotal === data.product.price * data.quantity,
    {
      message: 'Subtotal must equal product price × quantity',
      path: ['subtotal'],
    },
  )

/**
 * Full cart schema with computed totals
 */
export const CartSchema = z.object({
  /** Cart items array */
  items: z.array(CartItemSchema),

  /** Total number of items */
  itemCount: z.number().int('Item count must be an integer').nonnegative('Item count cannot be negative'),

  /** Subtotal (sum of all item subtotals) in cents */
  subtotal: z.number().int('Subtotal must be an integer').nonnegative('Subtotal cannot be negative'),

  /** Tax amount (10% of subtotal) in cents */
  tax: z.number().int('Tax must be an integer').nonnegative('Tax cannot be negative'),

  /** Total (subtotal + tax) in cents */
  total: z.number().int('Total must be an integer').nonnegative('Total cannot be negative'),
})

/**
 * Infer TypeScript types from schemas
 */
export type CartItem = z.infer<typeof CartItemSchema>
export type Cart = z.infer<typeof CartSchema>
