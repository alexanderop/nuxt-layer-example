/**
 * Cart feature store
 *
 * Demonstrates:
 * - Feature-specific state management
 * - localStorage persistence (uses shared storage utility)
 * - Importing from shared layer (Product type, storage utils)
 * - No imports from other features (products feature)
 */

import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Product } from '~/types/product'
import { getItem, setItem } from '~/utils/storage'
import type { CartItem } from '../types'
import {
  calculateItemSubtotal,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  calculateItemCount,
} from '../utils/calculations'

const STORAGE_KEY = 'shopping-cart'

/**
 * Cart store using Pinia composition API
 */
export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref<CartItem[]>([])

  // Load from localStorage on initialization
  const storedCart = getItem<CartItem[]>(STORAGE_KEY)
  if (storedCart) {
    items.value = storedCart
  }

  // Persist to localStorage when items change
  watch(
    items,
    (newItems) => {
      setItem(STORAGE_KEY, newItems)
    },
    { deep: true },
  )

  // Getters
  const itemCount = computed(() => calculateItemCount(items.value))

  const subtotal = computed(() => calculateSubtotal(items.value))

  const tax = computed(() => calculateTax(subtotal.value))

  const total = computed(() => calculateTotal(subtotal.value, tax.value))

  const isEmpty = computed(() => items.value.length === 0)

  const itemInCart = computed(() => (productId: string) => items.value.find(item => item.product.id === productId))

  // Actions

  /**
   * Add product to cart
   * If product already exists, increment quantity
   */
  function addItem(product: Product) {
    const existingItem = items.value.find(item => item.product.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
      existingItem.subtotal = calculateItemSubtotal(product.price, existingItem.quantity)
    }
    else {
      items.value.push({
        product,
        quantity: 1,
        subtotal: product.price,
      })
    }
  }

  /**
   * Remove product from cart
   */
  function removeItem(productId: string) {
    const index = items.value.findIndex(item => item.product.id === productId)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }

  /**
   * Update item quantity
   * If quantity is 0 or less, remove the item
   */
  function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }

    const item = items.value.find(i => i.product.id === productId)
    if (item) {
      item.quantity = quantity
      item.subtotal = calculateItemSubtotal(item.product.price, quantity)
    }
  }

  /**
   * Increment item quantity
   */
  function incrementItem(productId: string) {
    const item = items.value.find(i => i.product.id === productId)
    if (item) {
      updateQuantity(productId, item.quantity + 1)
    }
  }

  /**
   * Decrement item quantity
   */
  function decrementItem(productId: string) {
    const item = items.value.find(i => i.product.id === productId)
    if (item) {
      updateQuantity(productId, item.quantity - 1)
    }
  }

  /**
   * Clear cart
   */
  function clearCart() {
    items.value = []
  }

  return {
    // State
    items,

    // Getters
    itemCount,
    subtotal,
    tax,
    total,
    isEmpty,
    itemInCart,

    // Actions
    addItem,
    removeItem,
    updateQuantity,
    incrementItem,
    decrementItem,
    clearCart,
  }
})
