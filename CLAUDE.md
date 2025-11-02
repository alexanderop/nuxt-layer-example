# Layered Nuxt 4 E-commerce App Standards 


## Standards

MUST FOLLOW THESE RULES, NO EXCEPTIONS

* Stack: Nuxt 4, Vue 3, TypeScript, Pinia, Nuxt UI, Zod
* Architecture: Feature layers are INDEPENDENT, only app combines them
* Auto imports are disabled project wide, always import everything
* Always use `<script setup lang="ts">`, never Options API
* Always use layer aliases for cross layer imports (`#layers/...`, `#components`)
* Use Zod for every external boundary (API, localStorage, cross layer)
* Dual linting must pass: oxlint is the source of truth, ESLint is for Vue and architecture
* Stores follow Elm pattern with 4 files
* Published ESLint plugin (eslint-plugin-nuxt-layers) enforces strict layer boundaries

## Project Structure

Keep this section up to date.

```text
layers/
├── shared/        # UI + utils, no business logic
├── products/      # product schemas, product store, list/filter
└── cart/          # cart store, persistence, cart UI
.nuxt/             # Nuxt build output
.claude/           # custom slash commands
nuxt.config.ts     # auto imports disabled here and in each layer
```

Import rules:

* `shared` layer: cannot import from any layer (foundation)
* `products` layer: can import from `shared` ONLY
* `cart` layer: can import from `shared` ONLY
* `app` layer: can import from any layer (composition layer)
* Feature layers (products, cart) are INDEPENDENT - they never import from each other
* Cross-layer imports are prevented by both compile-time (Nuxt) and lint-time (eslint-plugin-nuxt-layers)

## Project Commands

Frequently used commands:

* `pnpm dev`: start dev server
* `pnpm build`: build for production
* `pnpm preview`: preview production build
* `pnpm typecheck`: run TypeScript checks
* `pnpm lint`: run oxlint and ESLint
* `pnpm lint:oxlint`: fast checks, main rule set
* `pnpm lint:eslint`: Vue and architecture rules
* `pnpm install` and `pnpm add <pkg>`: dependency management

## Linting Rules

You must keep linting consistent.

1. oxlint rules live in `.oxlintrc.json` and are the single source of truth
2. ESLint rules live in `eslint.config.mjs` and add Vue, architecture, and project specific checks
3. `eslint-plugin-oxlint` prevents overlap
4. If you add a general rule, add it to oxlint
5. If you add a Vue or architecture rule, add it to ESLint
6. Never define the same rule in both files

## Boundary Enforcement (Defense in Depth)

This project uses **two layers of boundary enforcement**:

### 1. Compile-time (Nuxt Layers - Primary)
Nuxt's layer system naturally prevents cross-layer imports:
* TypeScript **cannot resolve** imports like `#layers/products` from the `cart` layer
* Build **fails immediately** if you try to violate layer boundaries
* This is the **strongest** form of enforcement

### 2. Lint-time (Published ESLint Plugin - Secondary)
Published ESLint plugin (`eslint-plugin-nuxt-layers`) provides immediate feedback:
* Catches violations of both `#layers/...` aliases and relative imports like `../cart/...`
* Works in editor (with ESLint integration) for instant feedback
* Helpful error messages explain the violation and architecture intent
* Catches issues before running TypeScript compiler
* Maintained npm package with versioning and updates

### Enforced Rules
```text
✅ Allowed:
  - shared layer can import: nothing (foundation)
  - products layer can import: shared only
  - cart layer can import: shared only
  - app layer can import: shared, products, cart (composition layer)
  - Each layer can import from itself

❌ Prevented:
  - Feature layers (products ↔ cart) cannot import from each other
  - No layer can import from app
  - Shared cannot import from any layer

Architecture: Feature layers are INDEPENDENT islands
Flow: shared ← [products, cart] ← app
```

### Published ESLint Plugin
Configured in `eslint.config.mjs` using `eslint-plugin-nuxt-layers`:
* Detects current layer from file path
* Extracts imported layer from import statement (supports both aliases and relative paths)
* Enforces strict separation: feature layers never depend on each other
* If features need shared code, it MUST go in the shared layer
* Published npm package at: https://www.npmjs.com/package/eslint-plugin-nuxt-layers

### Why Both?
* **Compile-time**: Catches all violations, prevents broken builds
* **Lint-time**: Faster feedback loop, better DX in editor
* Together: **Defense in depth** for architecture boundaries

## Development Workflow

1. Read the layer docs if they exist (`layers/<name>/...`)
2. Create or update code inside the correct layer
3. Use explicit imports and layer aliases, do not enable auto imports
4. Validate external data with Zod at the boundary
5. Run `pnpm typecheck` and `pnpm lint`
6. If the change affects runtime behavior, run `pnpm dev` locally and test the page
7. Commit only after both linting steps pass

## Store Pattern

All Pinia stores follow Elm style.

```text
stores/{feature}/
  {feature}.ts         # Pinia integration
  {feature}Model.ts    # state + message types + initial state
  {feature}Update.ts   # pure reducer (model, msg) => newModel
  {feature}Effects.ts  # side effects (api, localStorage)
```

Rules:

* Components dispatch messages
* `{feature}Update.ts` is always pure
* Effects handle side work
* Always return new objects in reducers so Vue can track changes

## Schema and Validation

Use Zod for all data contracts.

* Define schemas in the layer that owns the data
* Validate on API response
* Validate on localStorage read
* Validate on cross layer data transfer
* Export types from the schema with `z.infer`

This keeps runtime and TypeScript in sync.

## Imports and Auto Imports

This project disables auto imports in `nuxt.config.ts` for the main app and for layers.

```ts
export default defineNuxtConfig({
  components: { dirs: [] },
  imports: { autoImport: false },
})
```

So you must:

* Import every Vue/Nuxt composable manually
* Import every component manually
* Use full layer aliases for cross layer imports
* Use relative imports only inside the same layer

## Vue Component Conventions

* `<script setup lang="ts">` only
* Typed `defineProps` and `defineEmits`
* Use `defineModel()` for `v-model` cases
* Use kebab case in templates for props and emits
* Use PascalCase for component names
* Import UI from `#components` or from the correct layer


## Documentation and Tools

* General architecture: `ARCHITECTURE.md`
* Quick reference for features: layer specific `claude.md` files
* Custom slash commands: `.claude/commands/` (`/new-page`, `/new-component`, `/new-api`, `/check`, `/commit`)
* Use these commands before writing your own scaffolding scripts

## Key Principles

1. Explicit over magic
2. Layers are features
3. One way dependency flow
4. Pure reducers in stores
5. Validate all boundaries
6. Dual linting always
7. TypeScript everywhere
