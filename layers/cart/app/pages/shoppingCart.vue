<script setup lang="ts">
/**
 * Cart page
 *
 * Demonstrates composition of the cart layer
 */

import { useHead } from '#app'
import { useRouter } from 'vue-router'
import { UMain, UContainer, UButton } from '#components'
import CartList from '#layers/cart/app/components/cartList.vue'

useHead({
  meta: [
    {
      content: 'View and manage your shopping cart',
      name: 'description',
    },
  ],
  title: 'Shopping Cart - Modern Shop',
})

const router = useRouter()

function goBack() {
  router.push('/')
}
</script>

<template>
  <UMain>
    <UContainer class="py-6 sm:py-8">
      <!-- Header with back button -->
      <header class="mb-8">
        <UButton
          type="button"
          variant="ghost"
          color="neutral"
          icon="i-lucide-arrow-left"
          label="Back to Shop"
          class="mb-4"
          @click="goBack"
        />
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
          Shopping Cart
        </h1>
      </header>

      <!-- Cart content -->
      <main>
        <CartList />
      </main>
    </UContainer>
  </UMain>
</template>
