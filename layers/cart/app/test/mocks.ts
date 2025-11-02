/**
 * Cart Layer Mock Generators
 *
 * Provides mock data generation for cart feature-specific schemas.
 * Uses shared layer's generateProduct for creating cart items with products.
 */

import { generateMock } from '@anatine/zod-mock'
import { CartItemSchema } from '#layers/cart/app/schemas/cart'
import { generateProduct } from '#layers/shared/app/test/mocks'
import type { CartItem } from '#layers/cart/app/schemas/cart'

/**
 * Generate a CartItem with optional overrides
 *
 * @param overrides - Partial cart item object to override generated values
 * @returns Valid CartItem matching CartItemSchema
 *
 * @example
 *   const item = generateCartItem()
 *   const customItem = generateCartItem({
 *     product: generateProduct({ name: 'Widget' }),
 *     quantity: 3
 *   })
 */
export function generateCartItem(overrides: Partial<CartItem> = {}): CartItem {
  const mock = generateMock(CartItemSchema)
  return { ...mock, ...overrides }
}

/**
 * Generate an array of CartItems
 *
 * @param count - Number of cart items to generate
 * @returns Array of valid CartItems
 *
 * @example
 *   const items = generateCartItems(3)
 */
export function generateCartItems(count: number): CartItem[] {
  return Array.from({ length: count }, () => generateCartItem())
}

/**
 * Generate a CartItem with specific price and quantity for calculations tests
 *
 * This is a convenience function for tests that need to verify exact calculations
 * with known values.
 *
 * @param price - Price in cents
 * @param quantity - Item quantity
 * @returns CartItem with specified price and quantity
 *
 * @example
 *   const item = generateCartItemWithPrice(1999, 2) // $19.99 × 2
 */
export function generateCartItemWithPrice(price: number, quantity: number): CartItem {
  return generateCartItem({
    product: generateProduct({ price }),
    quantity,
  })
}
