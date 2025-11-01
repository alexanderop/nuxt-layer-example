<script setup lang="ts">
/**
 * ProductCard component
 *
 * Displays a single product in a card format
 * Note: Uses shared utilities (formatCurrency) from app/utils
 */

import type { Product } from '~/types/product'
import { formatCurrency } from '~/utils/currency'

interface Props {
  product: Product
}

type Emits = (e: 'add-to-cart', product: Product) => void

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

function handleAddToCart() {
  emit('add-to-cart', props.product)
}
</script>

<template>
  <div class="product-card">
    <div class="product-image-container">
      <NuxtImg
        :src="product.image"
        :alt="product.name"
        class="product-image"
        loading="lazy"
      />
      <div
        v-if="product.stock === 0"
        class="out-of-stock-badge"
      >
        Out of Stock
      </div>
    </div>

    <div class="product-info">
      <h3 class="product-name">
        {{ product.name }}
      </h3>

      <p class="product-description">
        {{ product.description }}
      </p>

      <div class="product-footer">
        <div class="product-details">
          <span class="product-price">{{ formatCurrency(product.price) }}</span>
          <span
            v-if="product.rating"
            class="product-rating"
          >
            ⭐ {{ product.rating.toFixed(1) }}
          </span>
        </div>

        <button
          type="button"
          class="add-to-cart-btn"
          :disabled="product.stock === 0"
          @click="handleAddToCart"
        >
          {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.2s;
}

.product-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.product-image-container {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f3f4f6;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.out-of-stock-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(239, 68, 68, 0.9);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.product-info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.product-name {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  line-height: 1.4;
}

.product-description {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.product-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
}

.product-rating {
  font-size: 14px;
  color: #6b7280;
}

.add-to-cart-btn {
  width: 100%;
  padding: 10px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.add-to-cart-btn:hover:not(:disabled) {
  background: #2563eb;
}

.add-to-cart-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}
</style>
