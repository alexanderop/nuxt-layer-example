<script setup lang="ts">
/**
 * Home page
 *
 * Demonstrates feature composition:
 * - Products feature: ProductGrid and ProductFilters
 * - Cart feature: CartSummary
 * - Both features work together without direct dependencies
 */

import { onMounted } from 'vue'
import { useHead } from '#app'
import type { Product } from '~/types/product'
import { useCartStore } from '~/features/cart/stores/cart'
import { useProductsStore } from '~/features/products/stores/products'
import CartSummary from '~/features/cart/components/cartSummary.vue'
import ProductFilters from '~/features/products/components/productFilters.vue'
import ProductGrid from '~/features/products/components/productGrid.vue'

useHead({
  meta: [
    {
      content: 'Feature-based architecture e-commerce demo with Nuxt 4',
      name: 'description',
    },
  ],
  title: 'Shop - Nuxt 4 Demo',
})

const productsStore = useProductsStore()
const cartStore = useCartStore()

// Fetch products on mount
onMounted(async () => {
  await productsStore.fetchProducts()
})

function handleAddToCart(product: Product) {
  cartStore.addItem(product)
}
</script>

<template>
  <div class="home-page">
    <div class="container">
      <!-- Header -->
      <header class="header">
        <h1 class="title">
          Product Catalog
        </h1>
        <p class="subtitle">
          Feature-based architecture demo
        </p>
      </header>

      <!-- Main content -->
      <div class="content">
        <!-- Filters sidebar -->
        <aside class="sidebar">
          <ProductFilters
            :filter="productsStore.currentFilter"
            :sort="productsStore.currentSort"
            :categories="productsStore.categories"
            @update:filter="productsStore.setFilter"
            @update:sort="productsStore.setSort"
            @reset="productsStore.resetFilter"
          />
        </aside>

        <!-- Products grid -->
        <main class="main">
          <ProductGrid
            :products="productsStore.filteredProducts"
            :loading="productsStore.loading"
            @add-to-cart="handleAddToCart"
          />
        </main>
      </div>

      <!-- Floating cart summary -->
      <CartSummary />
    </div>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  background: #f9fafb;
  padding: 24px 16px 80px 16px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding-top: 20px;
}

.title {
  font-size: 36px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 8px 0;
}

.subtitle {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
}

.content {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
  align-items: start;
}

.sidebar {
  position: sticky;
  top: 24px;
}

.main {
  min-width: 0;
}

@media (max-width: 1024px) {
  .content {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
  }
}

@media (max-width: 640px) {
  .home-page {
    padding: 16px 12px 80px 12px;
  }

  .title {
    font-size: 28px;
  }

  .subtitle {
    font-size: 14px;
  }

  .header {
    margin-bottom: 24px;
  }
}
</style>
