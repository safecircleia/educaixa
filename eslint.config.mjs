import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'prefer-const': 'off',
      'react-hooks/rules-of-hooks': 'off',
      '@next/next/no-img-element': 'off',
      '@next/next/no-before-interactive-script-outside-document': 'off',
      'react-hooks/exhaustive-deps': 'off',
    },
  }),
];

export default eslintConfig;
