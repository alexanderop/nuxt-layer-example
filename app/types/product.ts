/**
 * Shared Product type used across multiple features
 *
 * This demonstrates the shared layer in feature-based architecture:
 * - Both products and cart features can import this type
 * - Features remain decoupled while sharing a common data contract
 * - Types are now derived from Zod schemas for runtime validation
 *
 * @deprecated Import from ~/shared/schemas/product instead for type-safe validation
 */

/**
 * Re-export types from Zod schemas
 * This maintains backward compatibility while centralizing types
 */
export type { Product, ProductCategory } from '~/shared/schemas/product'
