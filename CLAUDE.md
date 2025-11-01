# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 4 application using TypeScript and Vue 3. The project uses pnpm as the package manager and includes Nuxt UI, Nuxt Image, Nuxt Scripts, and Nuxt ESLint modules.

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Generate static site
pnpm generate

# Lint code (runs oxlint then ESLint)
pnpm lint

# Run only oxlint (fast)
pnpm lint:oxlint

# Run only ESLint
pnpm lint:eslint
```

## Architecture

### Project Structure

- `app/` - Main application directory
  - `app.vue` - Root component (currently displays NuxtWelcome)
- `public/` - Static assets served at root
- `.nuxt/` - Auto-generated build directory (do not edit)
- `nuxt.config.ts` - Nuxt configuration

### Nuxt Configuration

The project uses Nuxt 4 with compatibility date set to 2025-07-15. Configured modules:
- `@nuxt/eslint` - ESLint integration with auto-generated config
- `@nuxt/image` - Image optimization
- `@nuxt/scripts` - Third-party script management
- `@nuxt/ui` - UI component library

Devtools are enabled for development.

### Linting Configuration (Oxlint + ESLint)

This project uses a **dual-linting setup** for optimal performance and coverage:

#### Oxlint (Primary - Fast)
- **Purpose**: Fast, native-speed linting for common issues
- **Configuration**: `.oxlintrc.json`
- **Categories enabled**: correctness (error), suspicious (warn), pedantic (warn), style (warn)
- **Speed**: 50-100x faster than ESLint
- **Run via**: `pnpm lint:oxlint` or first in `pnpm lint`

#### ESLint (Secondary - Custom Rules)
- **Purpose**: Advanced rules that oxlint doesn't support
- **Configuration**: `eslint.config.mjs` (extends `.nuxt/eslint.config.mjs`)
- **Critical custom rules**:
  - `import-boundaries/no-restricted-paths` - Enforces feature-based architecture
  - `vue/no-undef-components` - Catches missing component imports (critical since auto-imports are disabled)
  - Complex Vue component rules (block order, naming conventions, etc.)
  - Code quality rules (complexity, max-depth, no-magic-numbers)
- **Integration**: `eslint-plugin-oxlint` automatically disables ESLint rules that overlap with oxlint
- **Run via**: `pnpm lint:eslint` or second in `pnpm lint`

#### Linting Workflow
```bash
# Recommended: Run both linters sequentially
pnpm lint  # oxlint (fast) → ESLint (custom rules)

# Or run individually for debugging
pnpm lint:oxlint  # Quick check
pnpm lint:eslint  # Deep analysis
```

**Important**: Oxlint runs FIRST for speed, then ESLint checks additional rules. The `eslint-plugin-oxlint` integration prevents duplicate checking by disabling ESLint rules that oxlint already covers.

### TypeScript Configuration

TypeScript uses project references pointing to auto-generated configs in `.nuxt/`:
- `tsconfig.app.json` - App-side TypeScript config
- `tsconfig.server.json` - Server-side TypeScript config
- `tsconfig.shared.json` - Shared TypeScript config
- `tsconfig.node.json` - Node environment config

## CRITICAL: Auto-Imports Are DISABLED

**This project has auto-imports disabled in `nuxt.config.ts`:**
- ALL imports must be explicit (Vue composables, Nuxt composables, components)
- Components MUST be manually imported in `<script setup>`
- Use `import { ref, computed } from 'vue'` instead of assuming auto-imports
- Use `import { useRouter } from 'vue-router'` explicitly

This is a deliberate choice for better code clarity and IDE support.

## Code Style Guidelines

- **Module System**: ES Modules only (type: "module" in package.json)
- **TypeScript**: All new files should use TypeScript (.ts/.vue)
- **Vue**: Use Composition API with `<script setup>` syntax
- **Imports**: Always explicit - no auto-imports
- **Linting**: Run `pnpm lint` to check code with oxlint and ESLint
- **Components**: PascalCase for component names

## Nuxt Conventions

When adding new functionality, follow Nuxt's file-based conventions:

- **Pages**: Create files in `pages/` directory for file-based routing
- **Components**: Place in `components/` directory (manually import)
- **Composables**: Place in `composables/` directory (manually import)
- **Layouts**: Create in `layouts/` directory
- **Middleware**: Add to `middleware/` directory
- **Plugins**: Place in `plugins/` directory
- **Server API**: Create endpoints in `server/api/` directory
- **Utils**: Utility functions go in `utils/` directory

All of these directories will be auto-created when needed.

## Testing

Currently no testing framework is configured. When adding tests:
- Consider Vitest for unit tests (Vue/Nuxt recommended)
- Consider Playwright for e2e tests
- Add test scripts to package.json

## Common Issues & Gotchas

1. **Auto-imports disabled**: Remember to manually import everything
2. **Dev server port**: Default is http://localhost:3000
3. **Build cache**: If something seems wrong, try deleting `.nuxt/` directory
4. **Package manager**: Use `pnpm` not `npm` or `yarn`
5. **TypeScript configs**: Don't edit files in `.nuxt/` - they're auto-generated
