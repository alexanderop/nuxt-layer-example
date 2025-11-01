<script setup lang="ts">
/**
 * CartList component
 *
 * Full cart view with items, totals, and checkout
 */

import { useRouter } from 'vue-router'
import { formatCurrency } from '~/utils/currency'
import { useCartStore } from '../stores/cart'
import CartItem from './cartItem.vue'

const cartStore = useCartStore()
const router = useRouter()

function continueShopping() {
  router.push('/')
}

function checkout() {
  // In a real app, this would navigate to checkout flow
  alert('Checkout functionality would be implemented here!')
}
</script>

<template>
  <div class="cart-list-container">
    <div
      v-if="cartStore.isEmpty"
      class="empty-cart"
    >
      <svg
        class="empty-icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <h2 class="empty-title">
        Your cart is empty
      </h2>
      <p class="empty-description">
        Add some products to get started
      </p>
      <button
        type="button"
        class="continue-shopping-btn"
        @click="continueShopping"
      >
        Continue Shopping
      </button>
    </div>

    <div
      v-else
      class="cart-content"
    >
      <div class="cart-items">
        <h2 class="cart-title">
          Shopping Cart ({{ cartStore.itemCount }} items)
        </h2>
        <div class="items-list">
          <CartItem
            v-for="item in cartStore.items"
            :key="item.product.id"
            :item="item"
            @increment="cartStore.incrementItem(item.product.id)"
            @decrement="cartStore.decrementItem(item.product.id)"
            @remove="cartStore.removeItem(item.product.id)"
          />
        </div>
      </div>

      <div class="cart-sidebar">
        <div class="order-summary">
          <h3 class="summary-title">
            Order Summary
          </h3>

          <div class="summary-line">
            <span>Subtotal</span>
            <span>{{ formatCurrency(cartStore.subtotal) }}</span>
          </div>

          <div class="summary-line">
            <span>Tax (10%)</span>
            <span>{{ formatCurrency(cartStore.tax) }}</span>
          </div>

          <div class="summary-divider" />

          <div class="summary-line summary-total">
            <span>Total</span>
            <span>{{ formatCurrency(cartStore.total) }}</span>
          </div>

          <button
            type="button"
            class="checkout-btn"
            @click="checkout"
          >
            Proceed to Checkout
          </button>

          <button
            type="button"
            class="continue-link"
            @click="continueShopping"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-list-container {
  width: 100%;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  text-align: center;
}

.empty-icon {
  width: 64px;
  height: 64px;
  color: #d1d5db;
  margin-bottom: 24px;
}

.empty-title {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
}

.empty-description {
  font-size: 16px;
  color: #6b7280;
  margin: 0 0 24px 0;
}

.continue-shopping-btn {
  padding: 12px 24px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.continue-shopping-btn:hover {
  background: #2563eb;
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 24px;
  align-items: start;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-title {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 16px 0;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cart-sidebar {
  position: sticky;
  top: 24px;
}

.order-summary {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.summary-title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #6b7280;
}

.summary-divider {
  height: 1px;
  background: #e5e7eb;
  margin: 8px 0;
}

.summary-total {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
}

.checkout-btn {
  width: 100%;
  padding: 14px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 8px;
}

.checkout-btn:hover {
  background: #2563eb;
}

.continue-link {
  width: 100%;
  padding: 12px;
  background: transparent;
  color: #3b82f6;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;
}

.continue-link:hover {
  color: #2563eb;
  text-decoration: underline;
}

@media (max-width: 1024px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-sidebar {
    position: static;
  }
}
</style>
