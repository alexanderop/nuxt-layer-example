<script setup lang="ts">
import { useHead } from '#app'
import { UMain, UContainer } from '#components'
import type { Product } from '#layers/shared/app/schemas/product'
import { useCartStore } from '#layers/cart/app/stores/cart/useCartStore'
import { useProductsStore } from '#layers/products/app/stores/products/useProductsStore'
import CartSummary from '#layers/cart/app/components/cartSummary.vue'
import ProductFilters from '#layers/products/app/components/productFilters.vue'
import ProductGrid from '#layers/products/app/components/productGrid.vue'

useHead({
  meta: [
    {
      content: 'Modern e-commerce shop with dark mode support',
      name: 'description',
    },
  ],
  title: 'Modern Shop',
})

const productsStore = useProductsStore()
const cartStore = useCartStore()

function handleAddToCart(product: Product) {
  cartStore.addItem(product)
}

function handleIncrement(product: Product) {
  cartStore.incrementItem(product.id)
}

function handleDecrement(product: Product) {
  cartStore.decrementItem(product.id)
}

function handleRemove(product: Product) {
  cartStore.removeItem(product.id)
}

function getCartQuantity(productId: string): number {
  return cartStore.itemInCart(productId)?.quantity ?? 0
}
</script>

<template>
  <UMain>
    <UContainer class="py-6 sm:py-8">
      <header class="text-center mb-8 sm:mb-10">
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Product Catalog
        </h1>
        <p class="text-base text-gray-600 dark:text-gray-400">
          Discover our collection of amazing products
        </p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
        <aside class="lg:sticky lg:top-24">
          <ProductFilters
            :filter="productsStore.currentFilter"
            :sort="productsStore.currentSort"
            :categories="(productsStore.categories as any)"
            @update:filter="(filter) => productsStore.setFilter(filter)"
            @update:sort="(sort) => productsStore.setSort(sort)"
            @reset="() => productsStore.resetFilter()"
          />
        </aside>

        <main class="min-w-0">
          <ProductGrid
            :products="(productsStore.filteredProducts as any)"
            :loading="productsStore.loading"
            :get-cart-quantity="getCartQuantity"
            @add-to-cart="handleAddToCart"
            @increment="handleIncrement"
            @decrement="handleDecrement"
            @remove="handleRemove"
          />
        </main>
      </div>

      <CartSummary />
    </UContainer>
  </UMain>
</template>
