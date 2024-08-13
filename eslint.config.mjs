import globals from "globals"
import pluginJs from "@eslint/js"
import stylistic from "@stylistic/eslint-plugin"
import tseslint from "typescript-eslint"

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "no-console": "error",
      "@stylistic/semi": ["error", "never"],
    },
    plugins: {
      "@stylistic": stylistic,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
]
