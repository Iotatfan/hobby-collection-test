import { test, expect } from '@playwright/test';

test.describe('API: Collection Endpoints', () => {
  test('should fetch user collections', async ({ request }) => {

    const response = await request.get('/collection');

    expect(response.ok()).toBeTruthy();
  });
});
