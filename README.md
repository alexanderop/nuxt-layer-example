# Nuxt Layers Modular Architecture Demo

This project demonstrates how to build a scalable, modular application using **Nuxt Layers** for feature-based architecture. It showcases best practices for organizing code into independent, reusable layers with strict boundaries.

## Project Goal

The goal of this project is to show how **Nuxt layers work for modular architecture** by:

- **Feature isolation**: Each feature (products, cart) is an independent layer
- **Strict boundaries**: Layers cannot import from each other, enforced at compile-time and lint-time
- **Shared foundation**: Common UI components and utilities live in a shared layer
- **Composition at app level**: The main app composes all layers together
- **Scalability**: Easy to add, remove, or modify features without affecting others

## Architecture Overview

```
layers/
├── shared/        # Foundation: UI components, utilities (no dependencies)
├── products/      # Products feature: schemas, store, components
└── cart/          # Cart feature: schemas, store, components, persistence
app/               # Composition layer: pages that use all features
```

**Key principle**: Features are independent islands. If two features need shared code, it goes in the `shared` layer.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architectural decisions and [CLAUDE.md](./CLAUDE.md) for development standards.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
