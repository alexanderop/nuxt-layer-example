/**
 * Products feature types
 *
 * Note: The Product type itself is in app/types/product.ts (shared layer)
 * This file contains feature-specific types for filtering and sorting
 * Types are now derived from Zod schemas for runtime validation
 *
 * @deprecated Import from ../schemas/filters instead for type-safe validation
 */

/**
 * Re-export types from Zod schemas
 * This maintains backward compatibility while centralizing types
 */
export type { ProductFilter, ProductSort } from '../schemas/filters'
