import { test, expect } from '@playwright/test';

test.describe('E2E: Authenticated tests', () => {
  test('should view the main page', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('text=Hobby Collection')).toBeVisible();
  });
});
