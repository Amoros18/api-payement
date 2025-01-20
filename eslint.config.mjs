import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Désactiver toutes les règles
      "no-console": "off",
      "@next/next/no-img-element": "off",
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-redeclare": "off",
      "no-shadow": "off",
      "no-use-before-define": "off",
      "no-empty-function": "off",
      "no-multiple-empty-lines": "off",
      "no-trailing-spaces": "off",
      "no-mixed-spaces-and-tabs": "off",
      "no-tabs": "off",
      "no-irregular-whitespace": "off",
      "no-unexpected-multiline": "off",
      "no-unreachable": "off",
      "no-unsafe-finally": "off",
      "no-useless-catch": "off",
      "no-useless-escape": "off",
      "no-with": "off",
      "no-constant-condition": "off",
      "no-dupe-args": "off",
      "no-dupe-keys": "off",
      "no-duplicate-case": "off",
      "no-empty": "off",
      "no-ex-assign": "off",
      "no-extra-boolean-cast": "off",
      "no-extra-semi": "off",
      "no-func-assign": "off",
      "no-inner-declarations": "off",
      "no-invalid-regexp": "off",
      "no-irregular-whitespace": "off",
      "no-obj-calls": "off",
      "no-prototype-builtins": "off",
      "no-regex-spaces": "off",
      "no-sparse-arrays": "off",
      "no-unexpected-multiline": "off",
      "no-unreachable": "off",
      "no-unsafe-finally": "off",
      "no-unsafe-negation": "off",
      "use-isnan": "off",
      "valid-typeof": "off",
      "@typescript-eslint/no-unused-vars": "off", // Désactiver la règle pour les variables non utilisées
      "@typescript-eslint/no-require-imports": "off", // Désactiver la règle pour les imports require()
      "prefer-const": "off",
      // Ajoutez d'autres règles à désactiver ici
    },
  },
];

export default eslintConfig;
