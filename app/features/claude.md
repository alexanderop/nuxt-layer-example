# Features

This directory contains **feature-based modules** that organize code by business domain rather than technical role.

## What is a Feature?

A feature is a self-contained module that encapsulates all the code related to a specific business domain or user-facing functionality. Each feature contains its own:

- Components
- Composables/API logic
- Types
- Stores (state management)
- Utilities
- Tests

## Feature Structure

Each feature follows this standard structure:

```
features/
└── [feature-name]/
    ├── api/              # API calls, composables
    ├── components/       # Feature-scoped components
    ├── stores/           # Pinia stores (optional)
    ├── types/            # TypeScript types
    ├── utils/            # Feature-specific utilities
    └── README.md         # Feature documentation
```

**Note:** You don't need all folders for every feature. Only create what's needed.

## Creating a New Feature

1. Create a folder with your feature name (kebab-case): `features/my-feature/`
2. Add only the subdirectories you need
3. Create a `README.md` documenting the feature
4. Build your feature following the architecture rules

## Architecture Rules

### ✅ Features CAN:
- Import from shared modules (`app/components`, `app/composables`, `app/types`, `app/utils`, `app/config`)
- Use their own internal modules
- Export components, composables, and types

### ❌ Features CANNOT:
- Import from other features (creates tight coupling)
- Import from `pages/` (features are lower in the hierarchy)

### Composing Features

If you need to use multiple features together, **compose them at the page level**:

```vue
<!-- pages/dashboard.vue -->
<script setup lang="ts">
import { TodoList } from '~/app/features/todos/components/todo-list.vue'
import { UserProfile } from '~/app/features/users/components/user-profile.vue'

// ✅ Compose features in the page
</script>

<template>
  <div>
    <UserProfile />
    <TodoList />
  </div>
</template>
```

## Benefits

- **Scalability**: Easy to add new features without affecting existing ones
- **Maintainability**: All related code is co-located
- **Independence**: Features can be developed, tested, and deployed independently
- **Clarity**: Clear boundaries between business domains
- **Reusability**: Features can be extracted or moved to other projects

## Examples

- `features/todos/` - Todo management
- `features/auth/` - Authentication and authorization
- `features/users/` - User management
- `features/comments/` - Comment system
- `features/analytics/` - Analytics tracking

## ESLint Enforcement

This architecture is enforced by ESLint rules in `eslint.config.mjs`:
- Prevents cross-feature imports
- Enforces unidirectional code flow (shared → features → pages)

Violations will show errors during development and in CI/CD.

## Learn More

See `/ARCHITECTURE.md` for comprehensive architecture documentation.
