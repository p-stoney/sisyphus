/// <reference types="vitest" />
/// <reference types="vite/client" />
import path from 'path'
import { defineConfig } from 'vite';
// import type { UserConfig as VitestUserConfig } from 'vitest/config';

// declare module 'vite' {
//   export interface UserConfig {
//     test: VitestUserConfig['test'];
//   }
// }

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    coverage: {
      provider: 'v8',
    },
  },
  resolve: {
    alias: {
      '@server': path.resolve(__dirname, './src'),
      '@tests': path.resolve(__dirname, './tests'),
    },
  },
});
