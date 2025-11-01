# Layer-Based Architecture for Nuxt 4

This document describes the layer-based architecture pattern implemented in this Nuxt 4 project.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Core Principles](#core-principles)
- [Layer Priority](#layer-priority)
- [Creating a New Layer](#creating-a-new-layer)
- [Layer Aliases](#layer-aliases)
- [State Management](#state-management)
- [Best Practices](#best-practices)
- [Examples](#examples)

## Overview

This project uses **Nuxt Layers** to organize code by business domain. Each layer is a mini Nuxt application that can be independently developed, tested, and even published as an npm package.

### Benefits

- **Natural Boundaries**: Layers physically separate features - no ESLint rules needed
- **Scalability**: Easy to add new layers without affecting existing ones
- **Reusability**: Layers can be published as npm packages or git repos
- **Independence**: Each layer has its own configuration, dependencies, and pages
- **Auto-Registration**: Layers in `~/layers/` are automatically registered
- **Named Aliases**: Access layers via `#layers/name` aliases
- **Override System**: Main app can override any layer component/config/page
- **Feature-Based Routing**: Each layer defines its own pages for complete feature isolation

## Project Structure

```
nuxt-app/
├── layers/                         # Nuxt layers (auto-registered)
│   ├── shared/                     # Base layer (foundational utilities)
│   │   ├── app/
│   │   │   ├── components/         # Shared UI components
│   │   │   │   └── baseBadge.vue
│   │   │   └── utils/              # Shared utilities
│   │   │       ├── currency.ts
│   │   │       └── storage.ts
│   │   ├── nuxt.config.ts          # Layer configuration
│   │   └── README.md               # Layer documentation
│   │
│   ├── products/                   # Products feature layer
│   │   ├── app/
│   │   │   ├── pages/              # Product-related pages
│   │   │   │   ├── (home)/
│   │   │   │   │   └── index.vue   # Home/catalog page
│   │   │   │   └── products/
│   │   │   │       └── [id].vue    # Product detail page
│   │   │   ├── components/         # Product components
│   │   │   │   ├── productCard.vue
│   │   │   │   ├── productGrid.vue
│   │   │   │   └── productFilters.vue
│   │   │   ├── stores/             # Pinia stores (Elm Architecture)
│   │   │   │   └── products/
│   │   │   │       ├── products.ts
│   │   │   │       ├── productsModel.ts
│   │   │   │       ├── productsUpdate.ts
│   │   │   │       └── productsEffects.ts
│   │   │   ├── schemas/            # Zod schemas
│   │   │   │   ├── product.ts
│   │   │   │   └── filters.ts
│   │   │   └── utils/              # Product utilities
│   │   │       └── filters.ts
│   │   ├── nuxt.config.ts
│   │   └── README.md
│   │
│   └── cart/                       # Cart feature layer
│       ├── app/
│       │   ├── pages/              # Cart-related pages
│       │   │   └── shoppingCart.vue # Shopping cart page
│       │   ├── components/         # Cart components
│       │   │   ├── cartItem.vue
│       │   │   ├── cartList.vue
│       │   │   └── cartSummary.vue
│       │   ├── stores/             # Pinia stores (Elm Architecture)
│       │   │   └── cart/
│       │   │       ├── cart.ts
│       │   │       ├── cartModel.ts
│       │   │       ├── cartUpdate.ts
│       │   │       └── cartEffects.ts
│       │   ├── schemas/            # Zod schemas
│       │   │   └── cart.ts
│       │   └── utils/              # Cart utilities
│       │       └── calculations.ts
│       ├── nuxt.config.ts
│       └── README.md
│
├── app/                            # Main application (highest priority)
│   ├── layouts/                    # App layouts (optional)
│   └── app.vue                     # Root component
│
├── public/                         # Static assets
├── nuxt.config.ts                  # Main Nuxt configuration
└── ARCHITECTURE.md                 # This file
```

## Core Principles

### 1. Layer Auto-Registration

Layers in `~/layers/` are automatically registered by Nuxt:
- No need to manually add them to `nuxt.config.ts`
- Named aliases created automatically: `#layers/shared`, `#layers/products`, `#layers/cart`
- Alphabetical registration order within `~/layers/`

### 2. Natural Boundaries

Layers provide physical separation:
- ✅ **No cross-layer imports possible** - enforced by filesystem
- ✅ **No ESLint boundary rules needed** - layers can't accidentally import from each other
- ✅ **Clear dependency direction**: shared → products → cart → main app

### 3. Named Aliases

Access layers using named aliases:
```typescript
// ✅ Using named alias (recommended)
import { formatCurrency } from '#layers/shared/app/utils/currency'
import { useProductsStore } from '#layers/products/app/stores/products/products'
import { useCartStore } from '#layers/cart/app/stores/cart/cart'

// ❌ Relative paths (discouraged)
import { formatCurrency } from '../../../layers/shared/app/utils/currency'
```

### 4. Override System

Main app has highest priority and can override anything:
```
Main App (highest)
    ↓
Cart Layer
    ↓
Products Layer
    ↓
Shared Layer (lowest)
```

## Layer Priority

Layers are registered in this order (earliest = highest priority among layers):

1. **Main application** (`app/`) - HIGHEST PRIORITY (always wins)
2. **`layers/shared`** (alphabetically last in layers/)
3. **`layers/products`**
4. **`layers/cart`** (alphabetically first in layers/)

This means:
- Main app can override any layer component/page
- `layers/shared` can override `layers/products` and `layers/cart`
- `layers/products` can override `layers/cart`

## Pages in Layers

Each layer can define its own pages that are automatically merged into the application's routing system. This provides complete feature isolation where a layer contains everything related to a feature: components, stores, schemas, utils, AND pages.

### Benefits of Layer Pages

- **Feature Ownership**: Each layer owns its complete feature including routes
- **Reusability**: Pages travel with the layer when published
- **No Coupling**: Main app doesn't need to know about layer pages
- **Override Support**: Main app can override layer pages if needed

### How It Works

When you add pages to a layer's `app/pages/` directory:
1. Nuxt automatically scans all layer pages
2. Pages are merged with the main app's routing
3. Layer priority determines which page wins if there's a conflict
4. The main app always has the highest priority

### Example Layer Page Structure

```
layers/products/app/pages/
├── (home)/
│   └── index.vue        # Route: /
└── products/
    └── [id].vue         # Route: /products/:id

layers/cart/app/pages/
└── shoppingCart.vue     # Route: /shoppingCart
```

## Creating a New Layer

### Step 1: Create Layer Directory

```bash
mkdir -p layers/my-feature/app/{pages,components,composables,stores,schemas,utils}
```

### Step 2: Add Layer Config

```ts
// layers/my-feature/nuxt.config.ts
export default defineNuxtConfig({
  $meta: {
    name: 'my-feature',
    description: 'My awesome feature',
  },

  // Disable auto-imports (for explicit imports)
  components: { dirs: [] },
  imports: { autoImport: false },
})
```

### Step 3: Create Components

```vue
<!-- layers/my-feature/app/components/myComponent.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { formatCurrency } from '#layers/shared/app/utils/currency'

const count = ref(0)
</script>

<template>
  <div>{{ count }}</div>
</template>
```

### Step 4: Create Zod Schemas

```typescript
// layers/my-feature/app/schemas/mySchema.ts
import { z } from 'zod'

export const MySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(200),
})

export type MyType = z.infer<typeof MySchema>
```

### Step 5: Create Pinia Store (Optional)

```typescript
// layers/my-feature/app/stores/myStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMyStore = defineStore('my-feature', () => {
  const items = ref([])
  return { items }
})
```

### Step 6: Document Your Layer

Create `layers/my-feature/README.md` with:
- Overview
- Contents (components, stores, schemas, utils)
- Usage examples
- Dependencies

### Step 7: Create Pages (Optional)

If your layer needs routes, add pages to `app/pages/`:

```vue
<!-- layers/my-feature/app/pages/my-feature.vue -->
<script setup lang="ts">
import MyComponent from '#layers/my-feature/app/components/myComponent.vue'
import { useMyStore } from '#layers/my-feature/app/stores/myStore'

const myStore = useMyStore()
</script>

<template>
  <div>
    <h1>My Feature</h1>
    <MyComponent />
  </div>
</template>
```

This automatically creates the `/my-feature` route without any configuration!

## Layer Aliases

Nuxt automatically creates named aliases for layers:

- `#layers/shared` → `layers/shared/app/`
- `#layers/products` → `layers/products/app/`
- `#layers/cart` → `layers/cart/app/`

Use these aliases instead of relative paths for better maintainability.

## State Management

This project uses **Pinia** with **The Elm Architecture** pattern:

### Elm Architecture in Layers

Each layer's store follows this pattern:

```
stores/feature/
├── feature.ts          # Pinia integration (connects to Vue)
├── featureModel.ts     # State shape & messages (pure)
├── featureUpdate.ts    # Pure update function (no side effects)
└── featureEffects.ts   # Side effects (API, localStorage)
```

### Benefits

- **Pure Logic**: Update functions are testable, framework-agnostic
- **Predictable**: Same input always produces same output
- **Traceable**: All state changes via explicit messages
- **Side-Effect Isolation**: Effects separated from pure logic

## Best Practices

### 1. Keep Layers Focused

Each layer should represent **one business domain**:
- ✅ `layers/products/` - Product catalog
- ✅ `layers/cart/` - Shopping cart
- ✅ `layers/checkout/` - Checkout flow
- ❌ `layers/utils/` - Too generic (use `layers/shared/`)

### 2. Use Shared Layer for Common Code

Move reusable code to `layers/shared/`:
- UI components used across features
- Utility functions (currency, dates, validation)
- Common types and interfaces

### 3. Layer Dependencies

Layers can depend on each other:
```typescript
// layers/cart depends on layers/products
import type { Product } from '#layers/products/app/schemas/product'
```

But avoid circular dependencies!

### 4. Runtime Validation

Always use Zod for:
- API responses
- localStorage data
- User input
- Cross-layer data

```typescript
import { z } from 'zod'
import { ProductSchema } from '#layers/products/app/schemas/product'

const result = ProductSchema.safeParse(data)
if (result.success) {
  // Use result.data safely
}
```

### 5. Document Layer APIs

Each layer should have clear public API documentation:
- Exported components
- Store methods
- Utility functions
- Type definitions

### 6. Test Layers Independently

Layers should be testable in isolation:
```typescript
// layers/products/app/utils/filters.test.ts
import { filterProducts } from './filters'

describe('filterProducts', () => {
  it('filters by category', () => {
    // Test without dependencies on other layers
  })
})
```

## Examples

### Example 1: Layer-Owned Pages

Pages are now defined within layers, not in the main app:

```vue
<!-- layers/products/app/pages/(home)/index.vue -->
<!-- This creates the / route -->
<script setup lang="ts">
import { onMounted } from 'vue'
import type { Product } from '#layers/products/app/schemas/product'
import { useProductsStore } from '#layers/products/app/stores/products/products'
import { useCartStore } from '#layers/cart/app/stores/cart/cart'
import ProductGrid from '#layers/products/app/components/productGrid.vue'
import CartSummary from '#layers/cart/app/components/cartSummary.vue'

const productsStore = useProductsStore()
const cartStore = useCartStore()

onMounted(async () => {
  await productsStore.fetchProducts()
})

function handleAddToCart(product: Product) {
  cartStore.dispatch({ type: 'ADD_ITEM', product })
}
</script>

<template>
  <div>
    <ProductGrid
      :products="productsStore.state.filteredProducts"
      @add-to-cart="handleAddToCart"
    />
    <CartSummary />
  </div>
</template>
```

```vue
<!-- layers/cart/app/pages/shoppingCart.vue -->
<!-- This creates the /shoppingCart route -->
<script setup lang="ts">
import CartList from '#layers/cart/app/components/cartList.vue'
</script>

<template>
  <div>
    <h1>Shopping Cart</h1>
    <CartList />
  </div>
</template>
```

### Example 2: Cross-Layer Types

```typescript
// layers/cart depends on layers/products for Product type
// layers/cart/app/schemas/cart.ts
import { z } from 'zod'
import { ProductSchema } from '#layers/products/app/schemas/product'

export const CartItemSchema = z.object({
  product: ProductSchema,  // ✅ Reusing Product schema
  quantity: z.number().positive(),
  subtotal: z.number().nonnegative(),
})
```

### Example 3: Shared Utilities

```typescript
// layers/shared/app/utils/currency.ts
export function formatCurrency(cents: number): string {
  const dollars = cents / 100
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(dollars)
}

// Used in layers/products and layers/cart
import { formatCurrency } from '#layers/shared/app/utils/currency'
```

## Publishing Layers

### As npm Package

1. Add `package.json` to layer:
```json
{
  "name": "@your-org/products-layer",
  "version": "1.0.0",
  "type": "module",
  "main": "./nuxt.config.ts",
  "dependencies": {
    "zod": "^3.x.x"
  },
  "devDependencies": {
    "nuxt": "^3.0.0"
  }
}
```

2. Publish to npm:
```bash
npm publish
```

3. Use in other projects:
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: [
    '@your-org/shared-layer',
    '@your-org/products-layer'
  ]
})
```

### As Git Repository

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: [
    'github:your-org/shared-layer',
    'github:your-org/products-layer#v1.0.0'
  ]
})
```

## Conclusion

Nuxt Layers provide:
- **Natural boundaries** enforced by filesystem
- **Scalable structure** for any size application
- **Reusability** via npm packages or git repos
- **Auto-registration** for zero-config setup
- **Type-safe** with explicit imports
- **Override system** for customization
- **Feature-complete isolation** - components, stores, schemas, utils, AND pages in one layer
- **Self-contained features** that can be developed, tested, and published independently

This architecture eliminates the need for ESLint boundary rules while providing even stronger guarantees about code organization. Each layer is a complete mini-application that owns its entire feature including routing.

## Additional Resources

- [Nuxt Layers Documentation](https://nuxt.com/docs/getting-started/layers)
- [Layer Authoring Guide](https://nuxt.com/docs/guide/going-further/layers)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Zod Documentation](https://zod.dev/)
