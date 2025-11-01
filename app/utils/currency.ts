/**
 * Shared currency utilities
 *
 * This demonstrates shared utilities in feature-based architecture:
 * - Both products and cart features use this for consistent formatting
 * - Pure functions with no side effects
 */

/** Conversion factor from cents to dollars */
const CENTS_PER_DOLLAR = 100

/**
 * Format a price in cents to USD currency string
 *
 * @param cents - Price in cents (e.g., 1999 for $19.99)
 * @returns Formatted currency string (e.g., "$19.99")
 *
 * @example
 * formatCurrency(1999) // "$19.99"
 * formatCurrency(0) // "$0.00"
 * formatCurrency(100) // "$1.00"
 */
export function formatCurrency(cents: number): string {
  const dollars = cents / CENTS_PER_DOLLAR
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(dollars)
}

/**
 * Parse a currency string to cents
 *
 * @param value - Currency string (e.g., "$19.99" or "19.99")
 * @returns Price in cents
 *
 * @example
 * parseCurrency("$19.99") // 1999
 * parseCurrency("19.99") // 1999
 */
export function parseCurrency(value: string): number {
  const cleaned = value.replace(/[$,\s]/g, '')
  const dollars = parseFloat(cleaned)
  return Math.round(dollars * CENTS_PER_DOLLAR)
}
