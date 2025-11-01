/**
 * Cart feature types
 *
 * Note: Uses the shared Product type from app/types/product.ts
 * This demonstrates how features can depend on shared types without coupling to other features
 * Types are now derived from Zod schemas for runtime validation
 *
 * @deprecated Import from ../schemas/cart instead for type-safe validation
 */

/**
 * Re-export types from Zod schemas
 * This maintains backward compatibility while centralizing types
 */
export type { CartItem, Cart } from '../schemas/cart'
