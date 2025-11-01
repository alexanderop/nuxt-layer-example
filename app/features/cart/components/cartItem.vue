<script setup lang="ts">
/**
 * CartItem component
 *
 * Displays a single cart item with quantity controls
 */

import type { CartItem } from '../types'
import { formatCurrency } from '~/utils/currency'

interface Props {
  item: CartItem
}

defineProps<Props>()

const emit = defineEmits<Emits>()

interface Emits {
  (e: 'increment'): void
  (e: 'decrement'): void
  (e: 'remove'): void
}

</script>

<template>
  <div class="cart-item">
    <div class="item-image-container">
      <NuxtImg
        :src="item.product.image"
        :alt="item.product.name"
        class="item-image"
      />
    </div>

    <div class="item-details">
      <h3 class="item-name">
        {{ item.product.name }}
      </h3>
      <p class="item-price">
        {{ formatCurrency(item.product.price) }} each
      </p>
    </div>

    <div class="item-controls">
      <div class="quantity-control">
        <button
          type="button"
          class="quantity-btn"
          aria-label="Decrease quantity"
          @click="emit('decrement')"
        >
          −
        </button>
        <span class="quantity-value">{{ item.quantity }}</span>
        <button
          type="button"
          class="quantity-btn"
          aria-label="Increase quantity"
          @click="emit('increment')"
        >
          +
        </button>
      </div>

      <div class="item-subtotal">
        {{ formatCurrency(item.subtotal) }}
      </div>

      <button
        type="button"
        class="remove-btn"
        aria-label="Remove item"
        @click="emit('remove')"
      >
        ×
      </button>
    </div>
  </div>
</template>

<style scoped>
.cart-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  align-items: center;
}

.item-image-container {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
  background: #f3f4f6;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-price {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.item-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 4px;
}

.quantity-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: background 0.2s;
}

.quantity-btn:hover {
  background: #e5e7eb;
}

.quantity-value {
  min-width: 32px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #111827;
}

.item-subtotal {
  min-width: 80px;
  text-align: right;
  font-size: 16px;
  font-weight: 700;
  color: #111827;
}

.remove-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 4px;
  font-size: 24px;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.2s;
}

.remove-btn:hover {
  background: #fee2e2;
  color: #ef4444;
}

@media (max-width: 640px) {
  .cart-item {
    flex-direction: column;
    align-items: stretch;
  }

  .item-image-container {
    width: 100%;
    height: 120px;
  }

  .item-controls {
    justify-content: space-between;
  }
}
</style>
