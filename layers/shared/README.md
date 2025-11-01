# Design System Layer

This layer provides shared UI components and utilities used across all features.

## Contents

### Components (`app/components/`)
- **baseBadge.vue** - Badge component for displaying counts, statuses, etc.

### Utilities (`app/utils/`)
- **currency.ts** - Currency formatting utilities (formatCurrency, parseCurrency)
- **storage.ts** - Type-safe localStorage utilities with Zod validation

## Usage

Components and utilities from this layer are available to all layers that extend it and to the main application.

### Importing Components
```vue
<script setup lang="ts">
import BaseBadge from '#layers/design-system/app/components/baseBadge.vue'
</script>

<template>
  <BaseBadge :value="5" variant="primary" />
</template>
```

### Importing Utilities
```typescript
import { formatCurrency } from '#layers/design-system/app/utils/currency'
import { getValidatedItem, setItem } from '#layers/design-system/app/utils/storage'

const price = formatCurrency(1999) // "$19.99"
```

## Architecture

This layer is the foundation of the application and:
- ✅ Can import from: standard libraries (vue, zod, etc.)
- ❌ Cannot import from: feature layers or main app
- ✅ Should contain: truly shared components and utilities
- ❌ Should not contain: business logic or feature-specific code

## Extending This Layer

To use this layer in another project:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: [
    './layers/design-system'
  ]
})
```

Or publish as npm package:

```ts
export default defineNuxtConfig({
  extends: [
    '@your-org/design-system'
  ]
})
```
