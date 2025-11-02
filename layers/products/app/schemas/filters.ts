import { z } from 'zod'
import { ProductCategorySchema } from '#layers/shared/app/schemas/product'

/**
 * Product Filter Schemas with Runtime Validation
 *
 * Validates user input for product filtering:
 * - Search query length limits (prevents XSS)
 * - Price range validation (min < max)
 * - Rating bounds (0-5)
 * - Category validation
 */

/**
 * Price range schema - validates min < max
 */
const PriceRangeSchema = z
  .object({
    /** Minimum price in cents */
    min: z.number().int('Min price must be an integer').nonnegative('Min price cannot be negative'),

    /** Maximum price in cents */
    max: z.number().int('Max price must be an integer').positive('Max price must be greater than 0'),
  })
  .refine((data) => data.min < data.max, {
    message: 'Minimum price must be less than maximum price',
    path: ['min'],
  })

/**
 * Product filter schema
 */
export const ProductFilterSchema = z.object({
  /** Search query - limited length for security */
  search: z.string().max(200, 'Search query too long').optional(),

  /** Category filter - validated against enum or 'all' */
  category: z.union([ProductCategorySchema, z.literal('all')]).optional(),

  /** Price range filter */
  priceRange: PriceRangeSchema.optional(),

  /** Minimum rating filter - must be between 0-5 */
  minRating: z.number().min(0, 'Rating must be at least 0').max(5, 'Rating cannot exceed 5').optional(),

  /** In-stock filter */
  inStock: z.boolean().optional(),
})

/**
 * Product sort options schema
 */
export const ProductSortSchema = z.enum([
  'name-asc',
  'name-desc',
  'price-asc',
  'price-desc',
  'rating-desc',
])

/**
 * Infer TypeScript types from schemas
 */
export type ProductFilter = z.infer<typeof ProductFilterSchema>
export type ProductSort = z.infer<typeof ProductSortSchema>
