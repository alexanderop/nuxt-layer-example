# Products Layer

This layer provides complete product catalog functionality including listing, filtering, sorting, and detail views.

## Contents

### Pages (`app/pages/`)
- **(home)/index.vue** - Home page with product catalog and filters
- **products/[id].vue** - Product detail page with full product information

### Components (`app/components/`)
- **productCard.vue** - Individual product card with image, details, and add-to-cart button
- **productGrid.vue** - Responsive grid layout for product cards with loading and empty states
- **productFilters.vue** - Filter UI for search, category, sort, and stock filtering

### Stores (`app/stores/products/`)
- **products.ts** - Main Pinia store with Elm Architecture pattern
- **productsModel.ts** - State shape, messages, and mock data
- **productsUpdate.ts** - Pure update function for state changes
- **productsEffects.ts** - Side effects (API calls)

### Schemas (`app/schemas/`)
- **product.ts** - Product and ProductCategory schemas with Zod validation
- **filters.ts** - ProductFilter and ProductSort schemas

### Utils (`app/utils/`)
- **filters.ts** - Pure functions for filtering and sorting products

## Usage

### Importing Components
```vue
<script setup lang="ts">
import ProductGrid from '#layers/products/app/components/productGrid.vue'
import ProductFilters from '#layers/products/app/components/productFilters.vue'
import type { Product } from '#layers/products/app/schemas/product'
</script>

<template>
  <div>
    <ProductFilters />
    <ProductGrid :products="products" @add-to-cart="handleAddToCart" />
  </div>
</template>
```

### Using the Store
```typescript
import { useProductsStore } from '#layers/products/app/stores/products/products'

const productsStore = useProductsStore()

// Fetch products
await productsStore.fetchProducts()

// Access state
const products = productsStore.state.filteredProducts
const loading = productsStore.state.loading

// Update filters
productsStore.setFilter({ category: 'electronics', inStock: true })
productsStore.setSort('price-asc')
```

## Architecture

This layer follows **The Elm Architecture** pattern for predictable state management:
- **Model**: Immutable state shape (productsModel.ts)
- **Update**: Pure function for state transitions (productsUpdate.ts)
- **Effects**: Side effects isolated from pure logic (productsEffects.ts)
- **Store**: Pinia integration with readonly state (products.ts)

### Layer Dependencies
- ✅ Extends from: `shared` layer (uses formatCurrency utility)
- ✅ Can import from: Vue, Pinia, Zod, Nuxt UI components
- ❌ Cannot import from: Other feature layers or main app

## Features

- **Product Catalog**: Display products with images, descriptions, prices, ratings
- **Filtering**: Search, category, price range, rating, stock availability
- **Sorting**: Name (A-Z, Z-A), Price (low-high, high-low), Rating (high-low)
- **Validation**: Runtime validation with Zod for data integrity
- **State Management**: Predictable state updates with Elm Architecture
- **Loading States**: Loading indicators and empty states
- **Mock Data**: 12 sample products across 5 categories

## Mock Data Categories

- Electronics (headphones, smartwatch, laptop backpack)
- Clothing (t-shirt, denim jacket)
- Books (design, JavaScript)
- Home (desk lamp, coffee maker)
- Sports (running shoes, water bottle, yoga mat)

## Extending This Layer

To use this layer in another project:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: [
    './layers/shared',    // Required dependency
    './layers/products'
  ]
})
```

Or publish as npm package:

```ts
export default defineNuxtConfig({
  extends: [
    '@your-org/shared',
    '@your-org/products'
  ]
})
```
