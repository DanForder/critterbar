import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30000,
  use: {
    baseURL: "http://localhost:1420",
    video: "on",
    screenshot: "on",
    browserName: "webkit",
  },
  webServer: {
    command: "npx vite",
    url: "http://localhost:1420",
    reuseExistingServer: true,
    timeout: 10000,
  },
  reporter: [["list"], ["html", { open: "never" }]],
});
