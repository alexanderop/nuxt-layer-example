<script setup lang="ts">
/**
 * CartSummary component
 *
 * Mini cart widget showing item count and total
 * Uses shared Badge component from app/components
 */

import { useRouter } from 'vue-router'
import { formatCurrency } from '~/utils/currency'
import { useCartStore } from '../stores/cart'
import BaseBadge from '~/components/baseBadge.vue'

const cartStore = useCartStore()
const router = useRouter()

function goToCart() {
  router.push('/cart')
}
</script>

<template>
  <button
    type="button"
    class="cart-summary"
    @click="goToCart"
  >
    <div class="cart-icon-container">
      <svg
        class="cart-icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <BaseBadge
        v-if="cartStore.itemCount > 0"
        :value="cartStore.itemCount"
        variant="danger"
        class="cart-badge"
      />
    </div>
    <div class="cart-total">
      {{ formatCurrency(cartStore.total) }}
    </div>
  </button>
</template>

<style scoped>
.cart-summary {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: #111827;
  color: white;
  border: none;
  border-radius: 50px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.2s;
  z-index: 1000;
}

.cart-summary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  background: #1f2937;
}

.cart-icon-container {
  position: relative;
  display: flex;
  align-items: center;
}

.cart-icon {
  width: 24px;
  height: 24px;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
}

.cart-total {
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .cart-summary {
    bottom: 16px;
    right: 16px;
    padding: 10px 16px;
  }

  .cart-icon {
    width: 20px;
    height: 20px;
  }

  .cart-total {
    font-size: 14px;
  }
}
</style>
