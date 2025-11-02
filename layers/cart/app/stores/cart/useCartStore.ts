import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { z } from 'zod'
import { CartItemSchema, type CartItem } from '../../schemas/cart'
import type { Product } from '#layers/shared/app/schemas/product'
import { getValidatedItem, setItem } from '#layers/shared/app/utils/storage'
import {
  calculateItemCount,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
} from '../../utils/calculations'

const STORAGE_KEY = 'shopping-cart'

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref<CartItem[]>([])

  // Actions
  function addItem(product: Product) {
    const existingItem = items.value.find(item => item.product.id === product.id)

    if (existingItem) {
      // Increment quantity if item already exists
      existingItem.quantity += 1
    }
    else {
      // Add new item
      items.value.push({
        product,
        quantity: 1,
      })
    }
  }

  function removeItem(productId: string) {
    items.value = items.value.filter(item => item.product.id !== productId)
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }

    const item = items.value.find(item => item.product.id === productId)
    if (item) {
      item.quantity = quantity
    }
  }

  function incrementItem(productId: string) {
    const item = items.value.find(item => item.product.id === productId)
    if (item) {
      item.quantity += 1
    }
  }

  function decrementItem(productId: string) {
    const item = items.value.find(item => item.product.id === productId)
    if (!item) return

    if (item.quantity <= 1) {
      removeItem(productId)
    }
    else {
      item.quantity -= 1
    }
  }

  function clearCart() {
    items.value = []
  }

  // Getters (computed)
  const itemCount = computed(() => calculateItemCount(items.value))
  const subtotal = computed(() => calculateSubtotal(items.value))
  const tax = computed(() => calculateTax(subtotal.value))
  const total = computed(() => calculateTotal(subtotal.value, tax.value))
  const isEmpty = computed(() => items.value.length === 0)
  const itemInCart = computed(() => (productId: string) =>
    items.value.find(item => item.product.id === productId),
  )

  // Effects: Load from storage on init
  function loadFromStorage() {
    const storedCart = getValidatedItem(
      STORAGE_KEY,
      z.array(CartItemSchema),
      (error) => {
        // eslint-disable-next-line no-console
        console.error('Cart data validation failed. Clearing corrupted cart:', error.issues)
      },
    )

    if (storedCart) {
      items.value = storedCart
    }
  }

  function saveToStorage() {
    setItem(STORAGE_KEY, items.value)
  }

  // Initialize: Load cart from storage
  loadFromStorage()

  // Auto-save to storage on every change
  watch(
    items,
    () => {
      saveToStorage()
    },
    { deep: true },
  )

  // Public API
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
