import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';

require('dotenv').config();

export default defineConfig({
  globalSetup: require.resolve('./src/global-setup'),
  testDir: './src',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  projects: [
    {
      name: 'api-read',
      testDir: './src/api/tests/read',
      use: {
        baseURL: process.env.API_BASE_URL || 'http://localhost:8080',
      },
    },
    {
      name: 'e2e-chromium',
      testDir: './src/e2e/tests',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.FE_BASE_URL || 'http://localhost:3000',
        storageState: path.join(__dirname, 'state.json'),
      },
    },
  ],
});
