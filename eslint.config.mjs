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
            "no-duplicate-imports": "error",
            "@stylistic/semi": ["error", "never"],
            "@stylistic/quotes": ["warn", "double"],
            "@stylistic/indent": ["error", 4],
            "@stylistic/brace-style": ["warn", "1tbs"],
        },
        plugins: {
            "@stylistic": stylistic,
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
]
