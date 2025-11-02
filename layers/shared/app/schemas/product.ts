import { z } from 'zod'

/**
 * Product Domain Schemas
 *
 * These schemas define the core Product domain entity that is shared across
 * multiple features (products, cart, etc.). They live in the shared layer
 * because they represent a data contract, not feature-specific logic.
 *
 * This Zod schema provides both compile-time types and runtime validation.
 * It enforces business rules that TypeScript alone cannot guarantee:
 * - Prices must be positive integers (in cents)
 * - Stock cannot be negative
 * - Ratings must be between 0 and 5
 * - IDs should follow a consistent format
 * - Image URLs must be valid
 */

/**
 * Product category enum schema
 */
export const ProductCategorySchema = z.enum([
  'electronics',
  'clothing',
  'books',
  'home',
  'sports',
])

/**
 * Product schema with business rule validation
 */
export const ProductSchema = z.object({
  /** Unique product identifier - enforces non-empty string */
  id: z.string().min(1, 'Product ID cannot be empty'),

  /** Product name - enforces reasonable length limits */
  name: z.string().min(1, 'Product name cannot be empty').max(200, 'Product name too long'),

  /** Product description - enforces reasonable length limits */
  description: z
    .string()
    .min(1, 'Product description cannot be empty')
    .max(2000, 'Product description too long'),

  /** Price in USD cents - must be positive integer */
  price: z
    .number()
    .int('Price must be an integer (cents)')
    .positive('Price must be greater than 0'),

  /** Product category - validated against enum */
  category: ProductCategorySchema,

  /** Product image URL - validates URL format */
  image: z.string().url('Invalid image URL format'),

  /** Available stock - must be non-negative integer */
  stock: z
    .number()
    .int('Stock must be an integer')
    .nonnegative('Stock cannot be negative'),

  /** Product rating - optional, must be between 0-5 */
  rating: z
    .number()
    .min(0, 'Rating must be at least 0')
    .max(5, 'Rating cannot exceed 5')
    .optional(),
})

/**
 * Infer TypeScript type from schema
 * This ensures the type always matches the schema
 */
export type Product = z.infer<typeof ProductSchema>

/**
 * Infer ProductCategory type from schema
 */
export type ProductCategory = z.infer<typeof ProductCategorySchema>
