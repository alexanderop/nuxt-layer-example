# Shared Composables

This directory contains Vue composables (reusable composition functions) that are **shared across multiple features** or used globally throughout the application.

## When to Put Composables Here

- Composables used by multiple features
- Global state management (if not using Pinia)
- Common utilities that need reactive state
- Shared API helpers
- Authentication/authorization composables
- Common form handling logic

## When NOT to Put Composables Here

- Feature-specific composables (put them in `app/features/[feature]/api/` or `app/features/[feature]/composables/`)
- Composables that only make sense in one feature's context

## Import Pattern

Since auto-imports are disabled, all composables must be explicitly imported:

```vue
<script setup lang="ts">
import { useAuth } from '~/app/composables/use-auth'
import { useFetch } from '~/app/composables/use-fetch'

const { user, login, logout } = useAuth()
const { data, error, loading } = useFetch('/api/endpoint')
</script>
```

## Naming Convention

- Use `use` prefix: `useAuth`, `useFetch`, `useLocalStorage`
- Use kebab-case for file names: `use-auth.ts`, `use-fetch.ts`

## Structure

Organize by domain or purpose:

```
composables/
├── use-auth.ts       # Authentication
├── use-api.ts        # API client
└── use-theme.ts      # Theme management
```

## Architecture Rules

- ✅ Can import from: `app/utils`, `app/types`, `app/config`
- ❌ Cannot import from: `app/features`, `pages`, `app/components`

This keeps shared composables independent and reusable across the entire application.
