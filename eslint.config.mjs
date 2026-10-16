import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "import/order": [
        "error",
        {
          // Groups dictate the order of appearance
          groups: [
            "builtin",   // Node.js built-ins (e.g., path, fs)
            "external",  // Third-party libraries (e.g., react, next)
            "internal",  // Your path aliases (e.g., @/components)
            ["parent", "sibling"], // Relative paths (e.g., ../, ./)
            "index",     // Index files
            "object",
            "type"       // TypeScript types
          ],
          "newlines-between": "always", // Adds spacing between groups
          alphabetize: {
            order: "asc", // Alphabetizes items within the same group
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
