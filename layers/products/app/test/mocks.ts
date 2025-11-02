/**
 * Products Layer Mock Generators
 *
 * Provides mock data generation for products feature-specific schemas.
 * These mocks are based on products layer schemas (filters, sorting).
 *
 * For Product entity mocks, use the shared layer:
 *   import { generateProduct, generateProducts } from '#layers/shared/app/test/mocks'
 */

import { generateMock } from '@anatine/zod-mock'
import { ProductFilterSchema, ProductSortSchema } from '#layers/products/app/schemas/filters'
import type { ProductFilter, ProductSort } from '#layers/products/app/schemas/filters'

/**
 * Generate a ProductFilter with optional overrides
 *
 * @param overrides - Partial filter object to override generated values
 * @returns Valid ProductFilter matching ProductFilterSchema
 *
 * @example
 *   const filter = generateFilter()
 *   const electronicsFilter = generateFilter({ category: 'electronics', inStock: true })
 */
export function generateFilter(overrides: Partial<ProductFilter> = {}): ProductFilter {
  const mock = generateMock(ProductFilterSchema)
  return { ...mock, ...overrides }
}

/**
 * Generate a ProductSort enum value
 *
 * @returns Valid ProductSort
 *
 * @example
 *   const sort = generateSort() // 'name-asc' | 'price-desc' | etc.
 */
export function generateSort(): ProductSort {
  return generateMock(ProductSortSchema)
}
