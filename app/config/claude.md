# Application Configuration

This directory contains application-wide configuration, environment variables, and constants.

## When to Put Configuration Here

- Environment variable definitions and parsing
- App-wide constants (API URLs, feature flags, etc.)
- Configuration for third-party services
- Global app settings

## When NOT to Put Configuration Here

- Feature-specific configuration (put in feature's directory)
- Runtime state (use stores or composables instead)

## Import Pattern

```typescript
import { API_BASE_URL, APP_NAME } from '~/app/config'
import { env } from '~/app/config/env'
```

## Structure

```
config/
├── index.ts          # Re-exports all config
├── env.ts            # Environment variables
├── constants.ts      # App constants
└── features.ts       # Feature flags
```

## Example

```typescript
// app/config/env.ts
export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const

// app/config/constants.ts
export const APP_NAME = 'My Nuxt App'
export const DEFAULT_PAGE_SIZE = 20
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

// app/config/features.ts
export const features = {
  enableAnalytics: true,
  enableDarkMode: true,
  enableExperimentalFeature: false,
} as const
```

## Architecture Rules

- ✅ Can import from: Nothing (leaf node in dependency graph)
- ❌ Cannot import from: Any app code
- Should be pure data/constants with minimal logic

Configuration should be the foundation that everything else builds upon.
