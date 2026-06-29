import { test, expect } from '@playwright/test';
import { expectValidCollectionItem, expectValidStatistics, expectValidCollectionFilter } from '../../schemas/collection.schema';
import { expectValidResponseStructure } from '../../schemas/response.schema';


test.describe('GET /collection', () => {
  test('should return valid collection list structure', async ({ request }) => {
    const response = await request.get('/collection');

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expectValidResponseStructure(body);
    expect(Array.isArray(body.data.collections)).toBeTruthy();

    for (const collection of body.data.collections) {
      expectValidCollectionItem(collection);
    }
  });

  test('should return valid statistics structure', async ({ request }) => {
    const response = await request.get('/collection/statistics');

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expectValidResponseStructure(body);
    expectValidStatistics(body.data);
  });

  test('should return valid collection filter structure', async ({ request }) => {
    const response = await request.get('/collection/filter');

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expectValidResponseStructure(body);
    expectValidCollectionFilter(body.data);
  });
});
