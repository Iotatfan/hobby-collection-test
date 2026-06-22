import type { Locator, Page } from '@playwright/test';

export class CollectionListPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  coverImages(): Locator {
    return this.page.locator('img[alt="cover image"]');
  }

  stat(name: string): Locator {
    return this.page.locator('dt').filter({ hasText: name });
  }

  categoryTab(name: string): Locator {
    return this.page.getByRole('tab', { name });
  }

  badge(name: string): Locator {
    return this.page.locator('.chakra-badge').filter({ hasText: name });
  }
}
