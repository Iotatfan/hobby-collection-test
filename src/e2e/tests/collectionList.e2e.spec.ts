import { test, expect } from '@playwright/test';

test.describe('E2E: Collection List tests', () => {
    test('should display the collection list when API return success', async ({ page }) => {
        await page.goto('/');

        const images = page.locator('img[alt="cover image"]');

        await expect.poll(() => images.count()).toBeGreaterThan(1);
    });

    test('should display statistics section when API return success', async ({ page }) => {
        await page.goto('/');

        const totalItems = page.locator('dt').filter({ hasText: 'Total Items' });
        const completed = page.locator('dt').filter({ hasText: 'Completed' });
        const backlog = page.locator('dt').filter({ hasText: 'Backlog' });
        const limited = page.locator('dt').filter({ hasText: 'P-Bandai / Limited' });

        await expect(totalItems).toBeVisible();
        await expect(completed).toBeVisible();
        await expect(backlog).toBeVisible();
        await expect(limited).toBeVisible();
    });

    test('should display Gunpla only when Gunpla filter is selected', async ({ page }) => {
        await page.goto('/');

        const gunplaFilter = page.getByRole('tab', { name: 'Gunpla' });
        await gunplaFilter.click();

        await expect(gunplaFilter).toHaveAttribute('aria-selected', 'true');
        expect(new URL(page.url()).searchParams.get('collection')).toBe('Gunpla');

        const figures = page.locator('.chakra-badge').filter({ hasText: 'Figure' });
        const other = page.locator('.chakra-badge').filter({ hasText: 'Other Model Kit' });

        await expect.poll(() => figures.count()).toBe(0);
        await expect.poll(() => other.count()).toBe(0);
    });

    test('should display Figures only when Figure filter is selected', async ({ page }) => {
        await page.goto('/');

        const figureFilter = page.getByRole('tab', { name: 'Figures' });
        await figureFilter.click();

        await expect(figureFilter).toHaveAttribute('aria-selected', 'true');
        expect(new URL(page.url()).searchParams.get('collection')).toBe('Figures');

        const gunpla = page.locator('.chakra-badge').filter({ hasText: 'Gunpla' });
        const other = page.locator('.chakra-badge').filter({ hasText: 'Other Model Kit' });

        await expect.poll(() => gunpla.count()).toBe(0);
        await expect.poll(() => other.count()).toBe(0);
    });

    test('should display Other Model Kits only when Other filter is selected', async ({ page }) => {
        await page.goto('/');

        const otherFilter = page.getByRole('tab', { name: 'Other Model Kits' });
        await otherFilter.click();

        await expect(otherFilter).toHaveAttribute('aria-selected', 'true');
        expect(new URL(page.url()).searchParams.get('collection')).toBe('Other Model Kits');

        const gunpla = page.locator('.chakra-badge').filter({ hasText: 'Gunpla' });
        const figures = page.locator('.chakra-badge').filter({ hasText: 'Figure' });

        await expect.poll(() => gunpla.count()).toBe(0);
        await expect.poll(() => figures.count()).toBe(0);
    });
});
