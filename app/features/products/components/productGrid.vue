<script setup lang="ts">
/**
 * ProductGrid component
 *
 * Displays a grid of product cards
 * Demonstrates composition of ProductCard components
 */

import type { Product } from '~/types/product'
import ProductCard from './productCard.vue'

interface Props {
  products: Product[]
  loading?: boolean
}

type Emits = (eventName: 'add-to-cart', product: Product) => void

withDefaults(defineProps<Props>(), {
  loading: false,
})

const emit = defineEmits<Emits>()

function handleAddToCart(product: Product) {
  emit('add-to-cart', product)
}
</script>

<template>
  <div class="product-grid-container">
    <div
      v-if="loading"
      class="loading-state"
    >
      <div class="spinner" />
      <p>Loading products...</p>
    </div>

    <div
      v-else-if="products.length === 0"
      class="empty-state"
    >
      <p>No products found matching your criteria.</p>
    </div>

    <div
      v-else
      class="product-grid"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="handleAddToCart"
      />
    </div>
  </div>
</template>

<style scoped>
.product-grid-container {
  width: 100%;
}

.loading-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  color: #6b7280;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  width: 100%;
}

@media (max-width: 640px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>
