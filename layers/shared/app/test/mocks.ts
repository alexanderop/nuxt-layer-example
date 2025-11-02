/**
 * Shared Layer Mock Generators
 *
 * Provides mock data generation for domain entities defined in the shared layer.
 * These mocks are based on shared schemas (Product, ProductCategory) and can be
 * used by any feature layer or the app.
 *
 * Benefits:
 * - Mocks always valid against Zod schemas
 * - Schema changes auto-update mocks
 * - Type-safe with proper TypeScript inference
 */

import { generateMock } from '@anatine/zod-mock'
import { ProductSchema, ProductCategorySchema } from '#layers/shared/app/schemas/product'
import type { Product, ProductCategory } from '#layers/shared/app/schemas/product'

/**
 * Generate a single Product with optional overrides
 *
 * @param overrides - Partial product object to override generated values
 * @returns Valid Product matching ProductSchema
 *
 * @example
 *   const product = generateProduct()
 *   const expensiveProduct = generateProduct({ price: 999900, category: 'electronics' })
 */
export function generateProduct(overrides: Partial<Product> = {}): Product {
  const mock = generateMock(ProductSchema)
  return { ...mock, ...overrides }
}

/**
 * Generate an array of Products
 *
 * @param count - Number of products to generate
 * @returns Array of valid Products
 *
 * @example
 *   const products = generateProducts(5)
 */
export function generateProducts(count: number): Product[] {
  return Array.from({ length: count }, () => generateProduct())
}

/**
 * Generate a ProductCategory enum value
 *
 * @returns Valid ProductCategory
 *
 * @example
 *   const category = generateCategory() // 'electronics' | 'clothing' | etc.
 */
export function generateCategory(): ProductCategory {
  return generateMock(ProductCategorySchema)
}
