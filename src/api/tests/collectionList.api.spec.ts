import { test, expect } from '@playwright/test';
import { expectValidCollectionItem } from './schemas/collection.schema';
import { expectValidResponseStructure } from './schemas/response.schema';


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
});