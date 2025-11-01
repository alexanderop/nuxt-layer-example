# Shared Utilities

This directory contains utility functions that are **shared across multiple features** or used globally throughout the application.

## When to Put Utilities Here

- Pure functions used by multiple features
- Date/time formatting utilities
- String manipulation helpers
- Validation functions
- Data transformation utilities
- Math/calculation helpers
- Common business logic utilities

## When NOT to Put Utilities Here

- Feature-specific utilities (put them in `app/features/[feature]/utils/`)
- Functions that depend on Vue reactivity (use composables instead)
- Functions specific to one feature

## Import Pattern

All utilities must be explicitly imported:

```typescript
import { formatDate, validateEmail, slugify } from '~/app/utils'
```

## Characteristics of Good Utils

- **Pure functions**: No side effects, same input = same output
- **Framework agnostic**: Don't depend on Vue, Nuxt, or other frameworks
- **Well-tested**: Easy to unit test
- **Single responsibility**: Each function does one thing well

## File Organization

```
utils/
├── index.ts          # Re-exports all utilities
├── date.ts           # Date/time utilities
├── string.ts         # String manipulation
├── validation.ts     # Validation functions
└── format.ts         # Formatting utilities
```

### Example: index.ts
```typescript
export * from './date'
export * from './string'
export * from './validation'
export * from './format'
```

## Naming Convention

- Use camelCase for function names: `formatDate`, `validateEmail`
- Use descriptive names that indicate what the function does
- Prefix boolean-returning functions with `is`, `has`, `should`: `isValid`, `hasPermission`

## Example

```typescript
// app/utils/validation.ts
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// app/utils/date.ts
export function formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
  // Implementation
  return date.toISOString().split('T')[0]
}
```

## Architecture Rules

- ✅ Can import from: `app/types`, other utils
- ❌ Cannot import from: `app/features`, `pages`, `app/components`, `app/composables`
- ❌ Should not use: Vue reactivity, Nuxt composables, framework-specific APIs

Keep utilities pure and framework-agnostic for maximum reusability and testability.
