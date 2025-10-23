// Extend Next.js base config and disable a rule to allow empty marker interfaces in UI props.
import next from "eslint-config-next";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...next,
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
];
