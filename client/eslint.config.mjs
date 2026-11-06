import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import next from 'eslint-config-next/core-web-vitals';

export default defineConfig([
  js.configs.recommended,
  ...next,
  {
    files: ['**/*.{js,mjs,ts,tsx}'],
    rules: {
      'no-unused-vars': ['warn', { args: 'after-used', argsIgnorePattern: '^_' }],
      'no-useless-assignment': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: { 'no-undef': 'off' },
  },
  globalIgnores(['graphql/generated/**']),
]);
