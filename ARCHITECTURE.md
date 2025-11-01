# Feature-Based Architecture for Nuxt 4

This document describes the feature-based architecture pattern implemented in this Nuxt 4 project, adapted from modern React patterns to work seamlessly with Nuxt conventions.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Core Principles](#core-principles)
- [Directory Organization](#directory-organization)
- [Architecture Rules](#architecture-rules)
- [Creating a New Feature](#creating-a-new-feature)
- [Routing Strategy](#routing-strategy)
- [State Management](#state-management)
- [ESLint Enforcement](#eslint-enforcement)
- [Best Practices](#best-practices)
- [Examples](#examples)

## Overview

This project uses a **feature-based architecture** where code is organized by business domain rather than technical role. Instead of having all components in one folder, all composables in another, etc., each feature encapsulates everything it needs in one place.

### Benefits

- **Scalability**: Easy to add new features without affecting existing ones
- **Maintainability**: All related code is co-located, making it easier to find and modify
- **Independence**: Features can be developed, tested, and even deployed independently
- **Clarity**: Clear boundaries between business domains
- **Reusability**: Features can be extracted or moved to other projects
- **Team Collaboration**: Different teams can work on different features with minimal conflicts

## Project Structure

```
nuxt-app/
├── app/
│   ├── features/              # Feature modules (business domains)
│   │   ├── todos/             # Example: Todos feature
│   │   │   ├── api/           # API calls & composables
│   │   │   ├── components/    # Feature-scoped components
│   │   │   ├── stores/        # Pinia stores
│   │   │   ├── types/         # TypeScript types
│   │   │   ├── utils/         # Feature-specific utilities
│   │   │   └── README.md      # Feature documentation
│   │   └── README.md          # Features guide
│   │
│   ├── components/            # Shared components
│   ├── composables/           # Shared composables
│   ├── types/                 # Shared types
│   ├── utils/                 # Shared utilities
│   ├── config/                # App configuration
│   └── app.vue                # Root component
│
├── pages/                     # File-based routing (Nuxt convention)
│   ├── (home)/                # Route group (parentheses ignored in URL)
│   │   └── index.vue          # Route: /
│   └── (todos)/               # Route group organized by feature
│       ├── index.vue          # Route: /todos
│       └── [id].vue           # Route: /todos/:id
│
├── public/                    # Static assets
├── nuxt.config.ts            # Nuxt configuration
├── eslint.config.mjs         # ESLint with boundary rules
├── ARCHITECTURE.md           # This file
└── CLAUDE.md                 # Project instructions
```

## Core Principles

### 1. Feature Encapsulation

Each feature is **self-contained** and includes everything it needs:
- Components
- API logic / Composables
- State management (Pinia stores)
- Types
- Utilities
- Tests

### 2. No Cross-Feature Imports

Features **cannot import from other features**. This prevents tight coupling and maintains independence.

❌ **Bad** - Cross-feature import:
```typescript
// app/features/comments/components/comment.vue
import { getUserName } from '~/app/features/users/utils/format'
```

✅ **Good** - Import from shared or compose at page level:
```typescript
// app/utils/format.ts (shared utility)
export function getUserName(user: User): string { ... }

// app/features/comments/components/comment.vue
import { getUserName } from '~/app/utils/format'
```

### 3. Unidirectional Code Flow

Code dependencies flow in **one direction**: `shared → features → pages`

```
┌──────────────────────────────────────────┐
│  Pages (Highest level)                   │
│  - Compose features                      │
│  - Define routes                         │
└────────────────┬─────────────────────────┘
                 │ can import from
                 ↓
┌──────────────────────────────────────────┐
│  Features (Middle level)                 │
│  - Business logic                        │
│  - Feature-specific components & state   │
└────────────────┬─────────────────────────┘
                 │ can import from
                 ↓
┌──────────────────────────────────────────┐
│  Shared (Lowest level)                   │
│  - components, composables, types, utils │
│  - Reusable across features              │
└──────────────────────────────────────────┘
```

### 4. Explicit Imports

This project has **auto-imports disabled**. All imports must be explicit:

```vue
<script setup lang="ts">
// ✅ Explicit imports required
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTodosStore } from '~/app/features/todos/stores/todos'
</script>
```

## Directory Organization

### Shared Directories

Located in `app/`:

- **`components/`** - UI components used by multiple features
- **`composables/`** - Vue composables shared across features
- **`types/`** - TypeScript types used globally
- **`utils/`** - Pure utility functions
- **`config/`** - App configuration and constants

**Rules:**
- ✅ Can import from: Each other
- ❌ Cannot import from: `features/`, `pages/`

### Features Directory

Located in `app/features/`:

Each feature has this structure:

```
features/[feature-name]/
├── api/              # API calls, composables for data fetching
├── components/       # Vue components specific to this feature
├── stores/           # Pinia stores (optional)
├── types/            # TypeScript types specific to this feature
├── utils/            # Utility functions specific to this feature
└── README.md         # Feature documentation
```

**Rules:**
- ✅ Can import from: Shared modules (`app/components`, `app/composables`, etc.)
- ✅ Can import from: Own feature's modules
- ❌ Cannot import from: Other features, `pages/`

### Pages Directory

Located in `pages/` (Nuxt convention):

Pages define routes and **compose features together**.

**Rules:**
- ✅ Can import from: Features, shared modules
- ✅ Can compose: Multiple features in one page
- ❌ Should not contain: Business logic (belongs in features)

## Architecture Rules

These rules are **enforced by ESLint** via `eslint-plugin-import`:

### 1. Prevent Cross-Feature Imports

```javascript
{
  target: './app/features/todos',
  from: './app/features',
  except: ['./todos'],
}
```

This ensures `todos` feature can't import from other features.

### 2. Enforce Unidirectional Flow

```javascript
// Features can't import from pages
{
  target: './app/features',
  from: './pages',
}

// Shared modules can't import from features or pages
{
  target: ['./app/components', './app/composables', './app/types', './app/utils', './app/config'],
  from: ['./app/features', './pages'],
}
```

## Creating a New Feature

### Step 1: Create Feature Directory

```bash
mkdir -p app/features/my-feature/{api,components,stores,types,utils}
```

### Step 2: Add Feature Types

```typescript
// app/features/my-feature/types/index.ts
export interface MyEntity {
  id: string
  name: string
}

export interface CreateMyEntityDto {
  name: string
}
```

### Step 3: Create API Composable (Optional)

```typescript
// app/features/my-feature/api/use-my-feature.ts
import { ref } from 'vue'
import type { MyEntity } from '../types'

export function useMyFeature() {
  const data = ref<MyEntity[]>([])
  const loading = ref(false)

  async function fetchData() {
    // API logic
  }

  return { data, loading, fetchData }
}
```

### Step 4: Create Pinia Store (Optional)

```typescript
// app/features/my-feature/stores/my-feature.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { MyEntity } from '../types'

export const useMyFeatureStore = defineStore('my-feature', () => {
  const items = ref<MyEntity[]>([])

  async function fetchItems() {
    // Implementation
  }

  return { items, fetchItems }
})
```

### Step 5: Create Components

```vue
<!-- app/features/my-feature/components/my-component.vue -->
<template>
  <div>{{ myEntity.name }}</div>
</template>

<script setup lang="ts">
import type { MyEntity } from '../types'

interface Props {
  myEntity: MyEntity
}

const props = defineProps<Props>()
</script>
```

### Step 6: Update ESLint Config

Add your feature to the boundary rules in `eslint.config.mjs`:

```javascript
{
  target: './app/features/my-feature',
  from: './app/features',
  except: ['./my-feature'],
},
```

### Step 7: Create Pages

```vue
<!-- pages/(my-feature)/index.vue -->
<template>
  <div>
    <MyComponent :my-entity="entity" />
  </div>
</template>

<script setup lang="ts">
import MyComponent from '~/app/features/my-feature/components/my-component.vue'
import { useMyFeatureStore } from '~/app/features/my-feature/stores/my-feature'

const store = useMyFeatureStore()
// ...
</script>
```

Note: Route groups use parentheses (e.g., `(my-feature)/`) to organize pages by feature while keeping clean URLs (`/my-feature` not `/(my-feature)`).

### Step 8: Document Your Feature

Create `app/features/my-feature/README.md` with:
- Overview
- Structure
- Usage examples
- API integration details
- Testing notes

## Routing Strategy

This project uses a **hybrid routing approach**:

- **Centralized Routes**: All route files live in `pages/` (Nuxt convention)
- **Route Groups**: Pages organized by feature domain using parentheses syntax (e.g., `(todos)/`) - the parentheses are ignored in URLs, allowing clean organization without affecting routing
- **Feature Composition**: Pages import and compose components from features
- **Clear Structure**: Routes are visible in one place
- **Feature Co-location**: Business logic stays with features

### Example

```vue
<!-- pages/dashboard.vue -->
<script setup lang="ts">
// Compose multiple features in one page
import TodoList from '~/app/features/todos/components/todo-list.vue'
import UserProfile from '~/app/features/users/components/user-profile.vue'
import Analytics from '~/app/features/analytics/components/dashboard.vue'
</script>

<template>
  <div class="dashboard">
    <UserProfile />
    <Analytics />
    <TodoList />
  </div>
</template>
```

## State Management

This project uses **Pinia** for state management.

### Feature-Scoped Stores

Each feature can have its own Pinia store:

```typescript
// app/features/todos/stores/todos.ts
export const useTodosStore = defineStore('todos', () => {
  // Feature-specific state
})
```

### Global Stores

For truly global state, create stores in a shared location:

```typescript
// app/stores/auth.ts (if you create this directory)
export const useAuthStore = defineStore('auth', () => {
  // Global authentication state
})
```

## ESLint Enforcement

### Running ESLint

```bash
# Check for violations
npx eslint .

# Auto-fix issues
npx eslint . --fix
```

### Example Violations

ESLint will catch architectural violations:

```typescript
// ❌ This will error: cross-feature import
// app/features/comments/api/use-comments.ts
import { getUserById } from '~/app/features/users/api/use-users'

// ❌ This will error: shared importing from feature
// app/components/button.vue
import { Todo } from '~/app/features/todos/types'

// ❌ This will error: feature importing from page
// app/features/todos/components/todo-list.vue
import { SomePage } from '~/pages/dashboard.vue'
```

## Best Practices

### 1. Keep Features Focused

Each feature should represent **one business domain**:
- ✅ `features/todos/` - Todo management
- ✅ `features/auth/` - Authentication
- ❌ `features/utils/` - Too generic, use `app/utils/` instead

### 2. Move to Shared When Needed

If a utility/component is used by **2+ features**, move it to shared:

```typescript
// Start here (feature-specific)
app/features/todos/utils/format-date.ts

// Multiple features need it? Move to shared
app/utils/format-date.ts
```

### 3. Document Features

Every feature should have a README.md explaining:
- What the feature does
- How to use it
- API integration details
- Type definitions

### 4. Test Features Independently

Features should be testable in isolation:

```typescript
// app/features/todos/utils/validation.test.ts
import { validateTodoTitle } from './validation'

describe('validateTodoTitle', () => {
  it('should validate correctly', () => {
    // Test without dependencies on other features
  })
})
```

### 5. Use TypeScript Strictly

Define clear types for your features:

```typescript
// app/features/todos/types/index.ts
export interface Todo {
  id: string
  title: string
  completed: boolean
}

// Export DTOs separately
export interface CreateTodoDto {
  title: string
}
```

## Examples

### Example 1: Todo Feature

See `app/features/todos/` for a complete example including:
- API composable: `api/use-todos.ts`
- Pinia store: `stores/todos.ts`
- Components: `components/todo-list.vue`, `todo-item.vue`, `todo-form.vue`
- Types: `types/index.ts`
- Validation: `utils/validation.ts`

### Example 2: Page Composing Features

```vue
<!-- pages/dashboard.vue -->
<script setup lang="ts">
import { onMounted } from 'vue'
import TodoList from '~/app/features/todos/components/todo-list.vue'
import { useTodosStore } from '~/app/features/todos/stores/todos'
import { useAuthStore } from '~/app/stores/auth'

const todosStore = useTodosStore()
const authStore = useAuthStore()

onMounted(async () => {
  await todosStore.fetchTodos()
})
</script>

<template>
  <div class="dashboard">
    <h1>Welcome, {{ authStore.user?.name }}</h1>
    <TodoList />
  </div>
</template>
```

### Example 3: Shared Utility

```typescript
// app/utils/date.ts
export function formatDate(date: Date, format = 'short'): string {
  // Pure utility function
  // Can be used by any feature
}

// Usage in feature
// app/features/todos/components/todo-item.vue
import { formatDate } from '~/app/utils/date'
```

## Conclusion

This architecture provides:
- **Clear boundaries** between features
- **Scalable structure** for growing applications
- **Enforced rules** via ESLint
- **Nuxt-friendly** approach using file-based routing
- **Type-safe** with explicit imports

By following these patterns, your codebase will remain organized, maintainable, and scalable as it grows.

## Additional Resources

- [Nuxt 4 Documentation](https://nuxt.com/docs)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [ESLint Plugin Import](https://github.com/import-js/eslint-plugin-import)

## Questions or Issues?

See `/app/features/README.md` for quick reference on creating features, or check individual README files in each shared directory for specific guidance.
