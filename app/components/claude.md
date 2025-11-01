# Shared Components

This directory contains components that are **shared across multiple features** or used globally throughout the application.

## When to Put Components Here

- Components used by multiple features
- Layout components (headers, footers, navigation)
- Common UI elements (buttons, modals, forms)
- Reusable utility components

## When NOT to Put Components Here

- Components specific to a single feature (put them in `app/features/[feature]/components/`)
- Feature-specific business logic components

## Import Pattern

Since auto-imports are disabled, all components must be explicitly imported:

```vue
<script setup lang="ts">
import { Button } from '~/app/components/button.vue'
import { Modal } from '~/app/components/modal.vue'
</script>
```

## Structure

Keep components organized by type or domain:

```
components/
├── ui/           # Generic UI components
├── layout/       # Layout components
└── forms/        # Form components
```

## Architecture Rules

- ✅ Can import from: `app/utils`, `app/types`, `app/composables`
- ❌ Cannot import from: `app/features`, `pages`

This ensures shared components remain truly shared and don't create coupling to specific features.
