// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import oxlint from 'eslint-plugin-oxlint'
import { SHARED_DISABLED_RULES } from './lint-config.js'

export default withNuxt().append(
  // Layer-based architecture
  // Layers provide natural boundaries - no ESLint boundary rules needed!
  // - Layers in ~/layers/ are auto-registered
  // - Layers cannot import from each other (enforced by Nuxt)
  // - Main app can import from any layer
  // - Layer order: shared > cart > products > main app (highest priority)

  // Vue component rules
  {
    rules: {
      // Enforce TypeScript in Vue script blocks
      'vue/block-lang': ['error', {
        script: { lang: 'ts' },
      }],

      // Enforce consistent block order
      'vue/block-order': ['error', {
        order: ['script', 'template', 'style'],
      }],

      // Enforce script-setup style
      'vue/component-api-style': ['error', ['script-setup']],

      // Enforce PascalCase for component names in templates
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],

      // Enforce type-based defineEmits
      'vue/define-emits-declaration': ['error', 'type-based'],

      // Enforce consistent macro order
      'vue/define-macros-order': ['error', {
        defineExposeLast: true,
        order: ['defineProps', 'defineEmits'],
      }],

      // Enforce type-based defineProps
      'vue/define-props-declaration': ['error', 'type-based'],

      // Enforce first attribute on new line for multiline
      'vue/first-attribute-linebreak': ['error', {
        multiline: 'below',
        singleline: 'beside',
      }],

      // Require type on button elements
      'vue/html-button-has-type': 'error',

      // Enforce one attribute per line for better readability
      'vue/max-attributes-per-line': ['error', {
        multiline: { max: 1 },
        singleline: { max: 1 },
      }],

      // Limit template nesting depth
      'vue/max-template-depth': ['error', { maxDepth: 9 }],

      // Allow single-word component names in pages (Nuxt convention)
      'vue/multi-word-component-names': ['error', {
        ignores: ['index', '[id]'],
      }],

      // CRITICAL: Detect undefined components (catches missing imports since auto-imports are disabled)
      'vue/no-undef-components': ['error', {
        ignorePatterns: [
          // Allow Nuxt built-in components
          'ClientOnly',
          'ServerPlaceholder',
          'NuxtLink',
          'NuxtLayout',
          'NuxtPage',
          'NuxtLoadingIndicator',
          'NuxtImg',
        ],
      }],

      // Detect unused refs
      'vue/no-unused-refs': 'error',
    },
  },

  // Code quality and complexity rules
  {
    rules: {
      // Disable problematic rule temporarily
      '@typescript-eslint/unified-signatures': 'off',

      // Limit cyclomatic complexity
      'complexity': ['error', { max: 13 }],

      // Limit nesting depth for better readability
      'max-depth': ['error', { max: 3 }],

      // Performance: suggest Promise.all instead of sequential awaits
      'no-await-in-loop': 'error',

      // Console and debugging
      'no-console': 'warn',
      'no-debugger': 'error',

      // Encourage early returns over else statements
      'no-else-return': 'error',

      // Security rules
      'no-eval': 'error',
      'no-implied-eval': 'error',

      // Prevent magic numbers (except common ones)
      'no-magic-numbers': ['error', {
        detectObjects: false,
        enforceConst: true,
        ignore: [-1, 0, 1, 2],
        ignoreArrayIndexes: true,
        ignoreDefaultValues: true,
      }],

      'no-new-func': 'error',
      'no-param-reassign': 'error',
      'no-return-assign': 'error',
      'no-throw-literal': 'error',

      // Best practices
      'prefer-promise-reject-errors': 'error',
      'prefer-template': 'error',
      'require-await': 'error',
    },
  },

  // Relaxed rules for test files
  {
    files: ['tests/**/*.ts', 'tests/**/*.js', '**/*.test.ts', '**/*.spec.ts'],
    rules: {
      'max-depth': 'off', // Test setup can be more nested
      'no-await-in-loop': 'off', // Sequential operations are legitimate in tests
      'no-magic-numbers': 'off',
      'ts/explicit-function-return-type': 'off',
    },
  },

  // Allow console.error in utility files for error logging
  {
    files: ['app/utils/**/*.ts', 'layers/**/app/utils/**/*.ts'],
    rules: {
      'no-console': ['error', { allow: ['error'] }],
    },
  },

  // Relaxed rules for store files (Pinia stores are naturally longer)
  {
    files: ['app/**/stores/**/*.ts', 'layers/**/app/stores/**/*.ts'],
    rules: {
      'max-lines-per-function': 'off', // Store setup functions are naturally longer
      'no-magic-numbers': 'off', // Allow magic numbers in stores for array operations, etc.
    },
  },

  // Relaxed rules for config files
  {
    files: ['*.config.*', '*.config.mjs', '*.config.ts', 'eslint.config.mjs'],
    rules: {
      'no-magic-numbers': 'off', // Config files often have numeric literals
    },
  },

  // Oxlint integration - disable ESLint rules that oxlint already checks
  // This must come AFTER all other configs to properly override rules
  ...oxlint.buildFromOxlintConfigFile('./.oxlintrc.json'),

  // Final overrides - shared disabled rules from lint-config.js
  // These preferences should not be changed by oxlint
  {
    rules: {
      ...SHARED_DISABLED_RULES,
    },
  },
)
