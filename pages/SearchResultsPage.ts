import { Page, Locator } from '@playwright/test';

export class SearchResultsPage {
  readonly page: Page;
  readonly hotelCards: Locator;
  readonly seeAvailabilityButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.hotelCards = page.locator('[data-testid="property-card"]');
    this.seeAvailabilityButton = page.locator('a:has-text("See availability")');
  }

  async waitForResults() {
    await this.page.waitForSelector('[data-testid="property-card"]', { timeout: 10000 });
  }

  async findAndClickTolipHotel(): Promise<void> {
    // Search for Tolip Hotel on current page
    const hotelName = 'Tolip Hotel Alexandria';
    let found = false;

    // Try to find on first page
    const hotelCards = await this.hotelCards.all();
    for (const card of hotelCards) {
      const text = await card.textContent();
      if (text && text.includes('Tolip Hotel Alexandria')) {
        const seeAvailabilityLink = card.locator('a:has-text("See availability")').first();
        await seeAvailabilityLink.click();
        found = true;
        break;
      }
    }

    // If not found on first page, go to second page
    if (!found) {
      await this.page.locator('button[aria-label="Next page"]').click();
      await this.page.waitForTimeout(2000);
      const hotelCards = await this.hotelCards.all();
      for (const card of hotelCards) {
        const text = await card.textContent();
        if (text && text.includes('Tolip Hotel Alexandria')) {
          const seeAvailabilityLink = card.locator('a:has-text("See availability")').first();
          await seeAvailabilityLink.click();
          found = true;
          break;
        }
      }
    }

    if (!found) {
      throw new Error('Tolip Hotel Alexandria not found in search results');
    }

    await this.page.waitForLoadState('networkidle');
  }
}

