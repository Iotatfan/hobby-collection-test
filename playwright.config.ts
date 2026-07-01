import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';

require('dotenv').config();

const isCI = Boolean(process.env.CI);

export default defineConfig({
  globalSetup: require.resolve('./src/global-setup'),
  testDir: './src',
  fullyParallel: true,
  retries: isCI ? 2 : 0,
  ...(isCI ? { workers: 1 } : {}),
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
