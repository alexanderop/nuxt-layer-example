# Create a new Nuxt page

Create a new page in the `pages/` directory with proper TypeScript setup and explicit imports.

**Remember:**
- This project has auto-imports disabled
- All Vue and Nuxt composables must be manually imported
- Use `<script setup lang="ts">` for TypeScript support
- Follow PascalCase for component names in imports

Ask the user for:
1. Page name/route (e.g., "about", "blog/[id]")
2. What the page should contain/do

Then create the page file with:
- Proper `<script setup lang="ts">` block with explicit imports
- SEO metadata using `useHead` if needed (imported from `#app`)
- Template structure
- Any necessary composables (all explicitly imported)
