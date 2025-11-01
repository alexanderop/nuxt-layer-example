# Shared Types

This directory contains TypeScript types and interfaces that are **shared across multiple features** or used globally throughout the application.

## When to Put Types Here

- Types used by multiple features
- Global domain models
- Common API response/request types
- Shared enums and constants
- Utility types used across the app

## When NOT to Put Types Here

- Feature-specific types (put them in `app/features/[feature]/types/`)
- Types only used in one feature

## Import Pattern

All types must be explicitly imported:

```typescript
import type { User, ApiResponse, PaginationParams } from '~/app/types'
```

## File Organization

Use index files to export types for easier imports:

```
types/
├── index.ts          # Re-exports all types
├── user.ts           # User-related types
├── api.ts            # API-related types
└── common.ts         # Common utility types
```

### Example: index.ts
```typescript
export * from './user'
export * from './api'
export * from './common'
```

## Naming Convention

- Use PascalCase for types and interfaces: `User`, `ApiResponse`
- Use UPPER_SNAKE_CASE for enums: `USER_ROLE`
- Use descriptive names that reflect the domain

## Example

```typescript
// app/types/user.ts
export interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

export type UserId = string
```

## Architecture Rules

- ✅ Can import from: other type files in `app/types`
- ❌ Cannot import from: `app/features`, `pages`, `app/components`, `app/composables`

Types should be pure TypeScript definitions with no runtime dependencies.
