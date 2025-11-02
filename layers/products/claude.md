# Products Layer

This layer provides complete product catalog functionality including listing, filtering, sorting, and detail views.

**IMPORTANT:** Product schemas (Product, ProductCategory) are in the **shared layer** (`#layers/shared/app/schemas/product`), not in this layer. This layer only contains feature-specific schemas (ProductFilter, ProductSort).

## Contents

### ⚠️ Note on Pages
Pages have been **moved to the app layer** (`app/pages/`) because they compose multiple features. The products layer now focuses purely on product catalog feature components and logic.

### Components (`app/components/`)
- **productCard.vue** - Individual product card with image, details, and add-to-cart button
- **productGrid.vue** - Responsive grid layout for product cards with loading and empty states
- **productFilters.vue** - Filter UI for search, category, sort, and stock filtering
- **productDetailImage.vue** - Product image display for detail page (40% width on desktop)
- **productDetailInfo.vue** - Product information panel with price, description, stock, rating (60% width on desktop)

### Stores (`app/stores/products/`)
- **useProductsStore.ts** - Main Pinia store using standard composition API pattern with ref/computed/actions

### Schemas (`app/schemas/`)
- **filters.ts** - ProductFilter and ProductSort schemas (feature-specific)
  - Validates search queries, categories, price ranges (min < max), ratings, stock filters

**⚠️ Product schemas moved to shared layer:**
- Product and ProductCategory are now in `#layers/shared/app/schemas/product`
- This allows both products and cart layers to import them without cross-layer dependencies

### Utils (`app/utils/`)
- **filters.ts** - Pure functions for filtering and sorting products by search, category, price range, rating, stock

## Usage

### Importing Components
```vue
<script setup lang="ts">
import ProductGrid from '#layers/products/app/components/productGrid.vue'
import ProductFilters from '#layers/products/app/components/productFilters.vue'
import type { Product } from '#layers/shared/app/schemas/product'  // ← From shared layer
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
import { useProductsStore } from '#layers/products/app/stores/products/useProductsStore'

const productsStore = useProductsStore()

// Fetch products (async action)
await productsStore.fetchProducts()

// Access state directly
const products = productsStore.filteredProducts
const loading = productsStore.loading
const categories = productsStore.categories
const product = productsStore.productById('product-1')

// Call actions to update state
productsStore.setFilter({ category: 'electronics', inStock: true })
productsStore.setSort('price-asc')
productsStore.resetFilter()
```

## Architecture

This layer uses the **standard Pinia composition API pattern** for state management:

### Store Pattern
The `useProductsStore` follows Pinia's composition API pattern with:

**State (ref/reactive):**
- `products` - Array of all products
- `loading` - Loading state for async operations
- `error` - Error message if fetch fails
- `currentFilter` - Current filter criteria (search, category, stock)
- `currentSort` - Current sort option

**Getters (computed):**
- `filteredProducts` - Products filtered and sorted based on current settings
- `productById(id)` - Find product by ID
- `categories` - Unique list of product categories

**Actions (functions):**
- `fetchProducts()` - Async fetch from API with Zod validation
- `setFilter(filter)` - Update filter criteria
- `setSort(sort)` - Update sort option
- `resetFilter()` - Reset filter and sort to defaults

### Store State Flow
1. Component calls action directly (e.g., `productsStore.setFilter(...)`)
2. Action updates state using direct mutations (e.g., `currentFilter.value = filter`)
3. Reactive state triggers computed properties to recalculate
4. Components automatically re-render with new data

### Layer Dependencies
- ✅ Extends from: `shared` layer
  - Product & ProductCategory schemas from `#layers/shared/app/schemas/product`
  - formatCurrency utility from `#layers/shared/app/utils/currency`
- ✅ Can import from: Vue, Pinia, Zod, Nuxt UI components, vue-router, shared layer only
- ❌ Cannot import from: `cart` layer or main app (strict feature layer independence)

## Features

- **Product Catalog**: Display products with images, descriptions, prices, ratings
- **Filtering**: Search, category, price range, rating, stock availability
- **Sorting**: Name (A-Z, Z-A), Price (low-high, high-low), Rating (high-low)
- **Validation**: Runtime validation with Zod for data integrity
- **State Management**: Standard Pinia composition API pattern
- **Loading States**: Loading indicators and empty states
- **Mock Data**: 12 sample products across 5 categories

## Mock Data Categories

- Electronics (headphones, smartwatch, laptop backpack)
- Clothing (t-shirt, denim jacket)
- Books (design, JavaScript)
- Home (desk lamp, coffee maker)
- Sports (running shoes, water bottle, yoga mat)

## Component Details

### ProductDetailImage
- Displays product image with responsive sizing
- Rounded corners and shadow styling
- Maintains aspect ratio with object-fit
- 40% width on desktop layouts (lg:grid-cols-[40%_60%])

### ProductDetailInfo
- Shows product name, category badge, price, rating
- Stock indicator with color-coded status
- Add-to-cart button with "in cart" state
- Full product description
- 60% width on desktop with contrasting background

### ProductCard
- Compact card layout for grid display
- Image with hover effects
- Stock badge overlay
- Price and rating display
- Quick add-to-cart button
- Click to navigate to product detail page

## SSR Considerations

Both pages use `useAsyncData` for SSR-friendly data fetching:

```typescript
// Fetch during SSR and hydration
await useAsyncData('products', () => productsStore.fetchProducts())
```

This ensures:
- Products are available on first render
- No loading flicker on page load
- SEO-friendly content delivery

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

## Implementation Notes

- **No Auto-Imports**: All imports are explicit per project standards
- **Layer Aliases**: Use `#layers/products/...` for cross-layer imports
- **Zod Validation**: All external data validated at boundaries (API responses)
- **Direct State Access**: State properties exposed directly, no wrapper object
- **Computed State**: Filtering and sorting happen in computed properties for reactivity
- **Standard Pinia Pattern**: Uses composition API with ref/computed/actions, matching cart store pattern
