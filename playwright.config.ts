import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.ORANGEHRM_BASE_URL;
if (!baseURL) {
  throw new Error('ORANGEHRM_BASE_URL is required. Copy .env.example to .env and configure it.');
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  timeout: 90_000,
  expect: { timeout: 10_000 },
  reporter: [['list'], ['allure-playwright', { resultsDir: 'allure-results' }]],
  outputDir: 'test-results',
  use: {
    baseURL,
    ...devices['Desktop Chrome'],
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});

