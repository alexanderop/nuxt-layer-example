# Cart Layer

This layer provides complete shopping cart functionality including add/remove items, quantity management, localStorage persistence, and checkout flow.

## Contents

### Pages (`app/pages/`)
- **shoppingCart.vue** - Full shopping cart page with cart management

### Components (`app/components/`)
- **cartItem.vue** - Individual cart item with quantity controls and remove button
- **cartList.vue** - Full cart view with all items, order summary, and checkout
- **cartSummary.vue** - Floating cart button widget showing total and item count

### Stores (`app/stores/cart/`)
- **cart.ts** - Main Pinia store with Elm Architecture pattern
- **cartModel.ts** - State shape, messages, and initial state
- **cartUpdate.ts** - Pure update function for state changes
- **cartEffects.ts** - Side effects (localStorage operations)

### Schemas (`app/schemas/`)
- **cart.ts** - CartItem and Cart schemas with Zod validation

### Utils (`app/utils/`)
- **calculations.ts** - Pure functions for cart calculations (subtotal, tax, total)

## Usage

### Importing Components
```vue
<script setup lang="ts">
import CartList from '#layers/cart/app/components/cartList.vue'
import CartSummary from '#layers/cart/app/components/cartSummary.vue'
</script>

<template>
  <div>
    <CartList />
    <CartSummary />
  </div>
</template>
```

### Using the Store
```typescript
import { useCartStore } from '#layers/cart/app/stores/cart/cart'
import type { Product } from '#layers/products/app/schemas/product'

const cartStore = useCartStore()

// Add product to cart
cartStore.dispatch({ type: 'ADD_ITEM', product })

// Update quantity
cartStore.dispatch({ type: 'INCREMENT_ITEM', productId: '1' })
cartStore.dispatch({ type: 'DECREMENT_ITEM', productId: '1' })

// Remove item
cartStore.dispatch({ type: 'REMOVE_ITEM', productId: '1' })

// Clear cart
cartStore.dispatch({ type: 'CLEAR_CART' })

// Access state
const items = cartStore.state.items
const total = cartStore.state.total
const isEmpty = cartStore.state.isEmpty
```

## Architecture

This layer follows **The Elm Architecture** pattern for predictable state management:
- **Model**: Immutable state shape (cartModel.ts)
- **Update**: Pure function for state transitions (cartUpdate.ts)
- **Effects**: Side effects isolated from pure logic (cartEffects.ts)
- **Store**: Pinia integration with readonly state (cart.ts)

### Layer Dependencies
- ✅ Extends from: `shared` layer (formatCurrency, storage utils)
- ✅ Depends on: `products` layer (Product type, ProductSchema)
- ✅ Can import from: Vue, Pinia, Zod, Nuxt UI components
- ❌ Cannot import from: Main app

## Features

- **Cart Management**: Add, remove, increment, decrement items
- **Persistence**: Automatic localStorage sync with validation
- **Calculations**: Subtotal, tax (10%), total
- **Validation**: Runtime validation with Zod for data integrity
- **State Management**: Predictable state updates with Elm Architecture
- **Responsive UI**: Mobile-optimized cart display
- **Empty States**: Friendly empty cart message with CTA
- **Floating Widget**: Always-visible cart summary button

## Calculations

- **Subtotal**: Sum of all item subtotals (price × quantity)
- **Tax**: 10% of subtotal (configurable in utils/calculations.ts)
- **Total**: Subtotal + Tax
- **Item Count**: Total quantity across all items

## LocalStorage

Cart data is automatically:
- Saved to localStorage on every change
- Loaded from localStorage on store initialization
- Validated with Zod schemas to prevent corrupted data
- Cleared if validation fails

Storage key: `shopping-cart`

## Extending This Layer

To use this layer in another project:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: [
    './layers/shared',    // Required dependency
    './layers/products',  // Required dependency
    './layers/cart'
  ]
})
```

Or publish as npm package:

```ts
export default defineNuxtConfig({
  extends: [
    '@your-org/shared',
    '@your-org/products',
    '@your-org/cart'
  ]
})
```
