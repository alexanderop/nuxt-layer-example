# Create a new Vue component

Create a new component in the `components/` directory with proper TypeScript and explicit imports.

**Remember:**
- This project has auto-imports disabled
- All Vue composables (ref, computed, etc.) must be imported from 'vue'
- Use `<script setup lang="ts">` for TypeScript support
- Components are NOT auto-imported - document how to import this component

Ask the user for:
1. Component name (PascalCase)
2. What the component should do
3. What props it should accept (if any)

Then create the component with:
- Proper `<script setup lang="ts">` block
- Explicit imports for Vue composables
- Props definition using `defineProps<T>()` if needed
- Template structure
- Show example import statement for using this component
