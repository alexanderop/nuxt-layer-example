/**
 * Cart feature store
 *
 * Demonstrates:
 * - Feature-specific state management
 * - localStorage persistence with Zod validation
 * - Importing from shared layer (Product type, storage utils)
 * - No imports from other features (products feature)
 * - Runtime data validation for security and data integrity
 */

import { z } from 'zod'
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Product } from '~/types/product'
import { ProductSchema } from '~/shared/schemas/product'
import { getValidatedItem, setItem } from '~/utils/storage'
import type { CartItem } from '../types'
import { CartItemSchema } from '../schemas/cart'
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

  // Load from localStorage on initialization with validation
  // If data is corrupted or invalid, it will be automatically removed
  const storedCart = getValidatedItem(STORAGE_KEY, z.array(CartItemSchema), (error) => {
    console.error('Cart data validation failed. Clearing corrupted cart:', error.issues)
  })
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
   * Validates product data before adding to cart
   */
  function addItem(product: Product) {
    // Validate product before adding to cart
    const validationResult = ProductSchema.safeParse(product)
    if (!validationResult.success) {
      console.error('Invalid product data:', validationResult.error.issues)
      throw new Error('Cannot add invalid product to cart')
    }

    const existingItem = items.value.find(item => item.product.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
      existingItem.subtotal = calculateItemSubtotal(product.price, existingItem.quantity)
    }
    else {
      items.value.push({
        product: validationResult.data,
        quantity: 1,
        subtotal: validationResult.data.price,
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
   * Validates quantity to ensure it's a positive integer
   */
  function updateQuantity(productId: string, quantity: number) {
    // Validate quantity
    const quantitySchema = z.number().int('Quantity must be an integer')
    const validationResult = quantitySchema.safeParse(quantity)

    if (!validationResult.success) {
      console.error('Invalid quantity:', validationResult.error.issues)
      throw new Error('Quantity must be an integer')
    }

    if (quantity <= 0) {
      removeItem(productId)
      return
    }

    const item = items.value.find(i => i.product.id === productId)
    if (item) {
      item.quantity = validationResult.data
      item.subtotal = calculateItemSubtotal(item.product.price, validationResult.data)
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
