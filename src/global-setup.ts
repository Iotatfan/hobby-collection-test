import { request, FullConfig } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

async function globalSetup(config: FullConfig) {
  const baseURL = process.env.API_BASE_URL || 'http://localhost:8080';
  const loginUrl = `${baseURL}/admin/token`;

  const requestContext = await request.newContext();

  try {
    const response = await requestContext.post(loginUrl, {
      data: {
        password: process.env.TEST_USER_PASSWORD || 'password123',
      },
    });

    if (response.ok()) {
      const body = await response.json();
      const token = body.token || body.access_token || body.data?.token;

      const statePath = path.join(__dirname, '..', 'state.json');

      const feBaseURL = process.env.FE_BASE_URL || 'http://localhost:3000';
      const state = {
        cookies: [],
        origins: [
          {
            origin: feBaseURL,
            localStorage: [
              {
                name: 'jwt', // Adjust based on how your React app stores it
                value: token,
              },
            ],
          },
        ],
      };
      fs.writeFileSync(statePath, JSON.stringify(state));

      process.env.TEST_JWT_TOKEN = token;
      console.log('Global setup: Successfully acquired JWT token');
    } else {
      console.warn('Global setup: Failed to acquire JWT token. Ensure backend is running.');
    }
  } catch (error) {
    console.error('Global setup: Error connecting to login endpoint.', error);
  } finally {
    await requestContext.dispose();
  }
}

export default globalSetup;
