<script setup lang="ts">
/**
 * Cart page
 *
 * Demonstrates composition of the cart feature
 */

import { useHead } from '#app'
import { useRouter } from 'vue-router'
import CartList from '~/features/cart/components/cartList.vue'

useHead({
  meta: [
    {
      content: 'View and manage your shopping cart',
      name: 'description',
    },
  ],
  title: 'Shopping Cart - Nuxt 4 Demo',
})

const router = useRouter()

function goBack() {
  router.push('/')
}
</script>

<template>
  <div class="cart-page">
    <div class="container">
      <!-- Header with back button -->
      <header class="header">
        <button
          type="button"
          class="back-btn"
          @click="goBack"
        >
          ← Back to Shop
        </button>
        <h1 class="title">
          Shopping Cart
        </h1>
      </header>

      <!-- Cart content -->
      <main class="main">
        <CartList />
      </main>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
  min-height: 100vh;
  background: #f9fafb;
  padding: 24px 16px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  margin-bottom: 32px;
}

.back-btn {
  padding: 8px 16px;
  background: transparent;
  color: #3b82f6;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 16px;
}

.back-btn:hover {
  background: #eff6ff;
}

.title {
  font-size: 32px;
  font-weight: 800;
  color: #111827;
  margin: 0;
}

@media (max-width: 640px) {
  .cart-page {
    padding: 16px 12px;
  }

  .title {
    font-size: 24px;
  }
}
</style>
