import { test, expect } from '@playwright/test';
import { CollectionListPage } from '../pages/CollectionListPage';

test.describe('E2E: Collection List tests', () => {
    test('should display the collection list when API return success', async ({ page }) => {
        const collectionListPage = new CollectionListPage(page);
        await collectionListPage.goto();

        const images = collectionListPage.coverImages();

        await expect.poll(() => images.count()).toBeGreaterThan(1);
    });

    test('should display statistics section when API return success', async ({ page }) => {
        const collectionListPage = new CollectionListPage(page);
        await collectionListPage.goto();

        const totalItems = collectionListPage.stat('Total Items');
        const completed = collectionListPage.stat('Completed');
        const backlog = collectionListPage.stat('Backlog');
        const limited = collectionListPage.stat('P-Bandai / Limited');

        await expect(totalItems).toBeVisible();
        await expect(completed).toBeVisible();
        await expect(backlog).toBeVisible();
        await expect(limited).toBeVisible();
    });

    test('should display Gunpla only when Gunpla filter is selected', async ({ page }) => {
        const collectionListPage = new CollectionListPage(page);
        await collectionListPage.goto();

        const gunplaFilter = collectionListPage.categoryTab('Gunpla');
        await gunplaFilter.click();

        await expect(gunplaFilter).toHaveAttribute('aria-selected', 'true');
        expect(new URL(page.url()).searchParams.get('collection')).toBe('Gunpla');

        const figures = collectionListPage.badge('Figure');
        const other = collectionListPage.badge('Other Model Kit');

        await expect.poll(() => figures.count()).toBe(0);
        await expect.poll(() => other.count()).toBe(0);
    });

    test('should display Figures only when Figure filter is selected', async ({ page }) => {
        const collectionListPage = new CollectionListPage(page);
        await collectionListPage.goto();

        const figureFilter = collectionListPage.categoryTab('Figures');
        await figureFilter.click();

        await expect(figureFilter).toHaveAttribute('aria-selected', 'true');
        expect(new URL(page.url()).searchParams.get('collection')).toBe('Figures');

        const gunpla = collectionListPage.badge('Gunpla');
        const other = collectionListPage.badge('Other Model Kit');

        await expect.poll(() => gunpla.count()).toBe(0);
        await expect.poll(() => other.count()).toBe(0);
    });

    test('should display Other Model Kits only when Other filter is selected', async ({ page }) => {
        const collectionListPage = new CollectionListPage(page);
        await collectionListPage.goto();

        const otherFilter = collectionListPage.categoryTab('Other Model Kits');
        await otherFilter.click();

        await expect(otherFilter).toHaveAttribute('aria-selected', 'true');
        expect(new URL(page.url()).searchParams.get('collection')).toBe('Other Model Kits');

        const gunpla = collectionListPage.badge('Gunpla');
        const figures = collectionListPage.badge('Figure');

        await expect.poll(() => gunpla.count()).toBe(0);
        await expect.poll(() => figures.count()).toBe(0);
    });
});
