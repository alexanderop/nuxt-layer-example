/**
 * Shared localStorage utilities
 *
 * This demonstrates shared utilities in feature-based architecture:
 * - Type-safe localStorage access
 * - Handles JSON serialization/deserialization
 * - Works on both client and server (with SSR guards)
 */

/**
 * Check if localStorage is available (client-side only)
 */
function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    const test = '__storage_test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  }
  catch {
    return false
  }
}

/**
 * Get item from localStorage with JSON parsing
 *
 * @param key - Storage key
 * @returns Parsed value or null if not found or invalid
 *
 * @example
 * const cart = getItem<Cart>('cart')
 */
export function getItem<T>(key: string): T | null {
  if (!isLocalStorageAvailable()) {
    return null
  }

  try {
    const item = localStorage.getItem(key)
    if (!item) {
      return null
    }
    return JSON.parse(item) as T
  }
  catch {
    return null
  }
}

/**
 * Set item in localStorage with JSON serialization
 *
 * @param key - Storage key
 * @param value - Value to store
 *
 * @example
 * setItem('cart', cartData)
 */
export function setItem<T>(key: string, value: T): void {
  if (!isLocalStorageAvailable()) {
    return
  }

  try {
    localStorage.setItem(key, JSON.stringify(value))
  }
  catch (error) {
    console.error('Failed to save to localStorage:', error)
  }
}

/**
 * Remove item from localStorage
 *
 * @param key - Storage key
 *
 * @example
 * removeItem('cart')
 */
export function removeItem(key: string): void {
  if (!isLocalStorageAvailable()) {
    return
  }

  try {
    localStorage.removeItem(key)
  }
  catch (error) {
    console.error('Failed to remove from localStorage:', error)
  }
}

/**
 * Clear all items from localStorage
 */
export function clear(): void {
  if (!isLocalStorageAvailable()) {
    return
  }

  try {
    localStorage.clear()
  }
  catch (error) {
    console.error('Failed to clear localStorage:', error)
  }
}
