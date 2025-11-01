/**
 * Shared Linting Configuration
 *
 * This file documents rules that are disabled in both oxlint and ESLint
 * to maintain consistency across linters.
 *
 * Update both .oxlintrc.json and eslint.config.mjs when changing these rules.
 */

export const SHARED_DISABLED_RULES = {
  /**
   * Prefer function declarations over arrow function expressions
   * Reason: Function declarations are hoisted and provide better readability for top-level functions
   */
  'func-style': 'off',

  /**
   * Allow manual control over import ordering
   * Reason: Prefer logical grouping (external deps, types, internal) over alphabetical
   */
  'sort-imports': 'off',

  /**
   * Allow manual control over object key ordering
   * Reason: Prefer semantic grouping over alphabetical ordering
   */
  'sort-keys': 'off',

  /**
   * Allow short identifier names (e.g., 'e' for events, 'i' for index)
   * Reason: Common conventions are more readable than enforced long names
   */
  'id-length': 'off',

  /**
   * Allow concise if statements without curly braces
   * Reason: Simpler code for single-statement conditionals
   */
  'curly': 'off',

  /**
   * Allow ternary expressions
   * Reason: Ternaries are often more concise and readable
   */
  'no-ternary': 'off',

  /**
   * Complexity rules - disabled for practical development
   */
  'no-magic-numbers': 'off',             // Too strict; allow numeric literals
  'max-lines-per-function': 'off',       // Store setup functions are naturally longer

  /**
   * Security rules - disabled for false positives
   */
  'no-script-url': 'off',                // False positive on "JavaScript: The Good Parts" book title

  /**
   * Unicorn plugin rules - disabled for project preferences
   */
  'unicorn/filename-case': 'off',        // Prefer PascalCase for Vue components
  'unicorn/catch-error-name': 'off',     // Allow 'err' or 'error'
  'unicorn/no-null': 'off',              // Allow null (needed for some APIs)
  'unicorn/no-zero-fractions': 'off',    // Allow 4.0 for clarity
  'unicorn/numeric-separators-style': 'off', // Don't enforce separators
  'unicorn/prefer-spread': 'off',        // Allow Array.from()
  'unicorn/switch-case-braces': 'off',   // Allow concise switch cases
  'unicorn/prefer-string-replace-all': 'off', // Allow replace() with regex
  'unicorn/prefer-global-this': 'off',   // Allow window, self, global
}

/**
 * Apply these disabled rules to ESLint config
 * Usage in eslint.config.mjs:
 *
 * import { SHARED_DISABLED_RULES } from './lint-config.js'
 *
 * export default {
 *   rules: {
 *     ...SHARED_DISABLED_RULES,
 *     // other rules
 *   }
 * }
 */

/**
 * Apply these disabled rules to oxlint config
 * Usage in .oxlintrc.json:
 *
 * {
 *   "rules": {
 *     "unicorn/filename-case": "off",
 *     "unicorn/catch-error-name": "off",
 *     "unicorn/no-null": "off",
 *     "unicorn/no-zero-fractions": "off",
 *     "unicorn/numeric-separators-style": "off",
 *     "unicorn/prefer-spread": "off"
 *   }
 * }
 *
 * Note: Oxlint doesn't support all ESLint rules. Only disable rules that
 * oxlint actually checks (mainly unicorn plugin rules).
 */
