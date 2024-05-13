/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    include: ["src/**/*.spec.ts", "src/**/*.spec.tsx"],
    coverage: {
      provider: "v8",
    },
  },
});

// /// <reference types="vitest" />
// /// <reference types="vite/client" />
// import path from "path";
// import { defineConfig } from "vite";
// import type { UserConfig as VitestUserConfig } from "vitest/config";
// import { tsconfigPaths } from "vite-tsconfig-paths";

// declare module "vite" {
//   export interface UserConfig {
//     test?: VitestUserConfig["test"];
//   }
// }

// export default defineConfig({
//   plugins: [tsconfigPaths()],
//   test: {
//     environment: "node",
//     globals: true,
//     coverage: {
//       provider: "v8",
//     },
//   },
//   resolve: {
//     alias: {
//       // "@server": path.resolve(__dirname, "./src"),
//       "~/*": path.resolve(__dirname, "./src"),
//       // "@tests": path.resolve(__dirname, "./src"),
//     },
//   },
// });

// import { defineConfig } from "vitest/config";
// import react from "@vitejs/plugin-react";
// import { resolve } from "node:path";
// import tsconfigPaths from "vite-tsconfig-paths";

// export default defineConfig({
//   plugins: [react()],
//   test: {
//     environment: "node",
//     globals: true,
//     coverage: {
//       provider: "v8",
//     },
//   },
//   resolve: {
//     alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
//   },
// });
