import path from 'path'
// import type { UserConfig as VitestUserConfig } from 'vitest/config';
import { defineConfig } from 'vite';

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
