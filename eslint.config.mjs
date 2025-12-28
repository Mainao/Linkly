import { defineConfig, globalIgnores } from "eslint/config";

import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

import tsPlugin from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import prettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
    /* =========================
       Next.js recommended rules
    ========================== */
    ...nextVitals,
    ...nextTs,

    /* =========================
       TypeScript rules
       (Airbnb-style)
    ========================== */
    {
        files: ["**/*.{ts,tsx}"],
        plugins: {
            "@typescript-eslint": tsPlugin,
            import: importPlugin,
            "simple-import-sort": simpleImportSort,
        },
        rules: {
            /* ===== Core (Airbnb-like) ===== */
            eqeqeq: ["error", "always"],
            "no-var": "error",
            "prefer-const": "error",

            "no-shadow": "off",
            "@typescript-eslint/no-shadow": "error",

            /* ===== React ===== */
            "react/react-in-jsx-scope": "off",
            "react/function-component-definition": "off",
            "react/require-default-props": "off",
            "react/jsx-props-no-spreading": "off",

            /* ===== Hooks ===== */
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",

            /* ===== Imports ===== */
            "import/no-unresolved": "off",
            "import/prefer-default-export": "off",

            "simple-import-sort/imports": [
                "error",
                {
                    groups: [
                        ["^react", "^next"],
                        ["^@?\\w"],
                        ["^@/"],
                        ["^\\."],
                    ],
                },
            ],
            "simple-import-sort/exports": "error",

            /* ===== TypeScript ===== */
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_" },
            ],
        },
    },

    /* =========================
       Disable Prettier conflicts
    ========================== */
    prettier,

    /* =========================
       Global ignores
    ========================== */
    globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
