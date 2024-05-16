import { defineConfig, devices } from "@playwright/test";

const PORT = process.env.PORT || 3000;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  timeout: 25 * 1000,
  testDir: "e2e/",
  //   retries: 1,
  outputDir: "e2e/test-results/",
  workers: 1,

  webServer: {
    command: "npm run dev",
    url: baseURL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    baseURL,
    trace: "on",
  },

  projects: [
    // {
    //   name: "Clerk Setup",
    //   testMatch: "e2e/global.setup.ts",
    // },
    {
      name: "Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
      },
      //   dependencies: ["Clerk Setup"],
    },
    // {
    //   name: 'Desktop Firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    // {
    //   name: 'Desktop Safari',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },
    // Test against mobile viewports.
    // {
    //   name: "Mobile Chrome",
    //   use: {
    //     ...devices["Pixel 5"],
    //   },
    // },
    // {
    //   name: "Mobile Safari",
    //   use: devices["iPhone 12"],
    // },
  ],
});
