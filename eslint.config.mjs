import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import { FlatCompat } from "@eslint/eslintrc";


const compact = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: "eslint:recommended",
});


/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...compact.plugins("@typescript-eslint"),
  // ...compact.extends("eslint:recommended"),
  ...compact.extends("plugin:@typescript-eslint/recommended"),
  ...compact.extends("plugin:@typescript-eslint/recommended-type-checked"),
  {
    files: ["**/*.{js,mjs,cjs,ts}"]
  },
  {    
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
    languageOptions: { 
      globals:{ ...globals.browser, ...globals.node },
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        project: "./tsconfig.json",
      },
    },
    rules: {
      "no-console": "warn",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/strict-boolean-expressions": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": ["error", {
        "prefer": "type-imports",
        "fixStyle": "inline-type-imports"
      }],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { 
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ]
    },
  },
  {
    ignores: [
      "dist/",
      "node_modules/",
      "eslint.config.mjs",
    ]
  },

];