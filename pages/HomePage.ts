import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly checkInDate: Locator;
  readonly checkOutDate: Locator;
  readonly searchButton: Locator;
  readonly acceptCookiesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('input[name="ss"]');
    this.checkInDate = page.locator('button[data-testid="date-display-field-start"]');
    this.checkOutDate = page.locator('button[data-testid="date-display-field-end"]');
    this.searchButton = page.locator('button[type="submit"]');
    this.acceptCookiesButton = page.locator('button#onetrust-accept-btn-handler');
  }

  async navigate() {
    await this.page.goto('https://www.booking.com');
    // Handle cookies popup if it appears
    try {
      await this.acceptCookiesButton.click({ timeout: 3000 });
    } catch (e) {
      // Cookies popup might not appear
    }
  }

  async searchLocation(location: string) {
    await this.searchInput.fill(location);
    // Wait for autocomplete and select first option
    await this.page.waitForTimeout(1000);
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
  }

  async selectCheckInDate(date: Date) {
    await this.checkInDate.click();
    const dateString = this.formatDateForBooking(date);
    await this.page.locator(`span[data-date="${dateString}"]`).click();
  }

  async selectCheckOutDate(date: Date) {
    const dateString = this.formatDateForBooking(date);
    await this.page.locator(`span[data-date="${dateString}"]`).click();
  }

  async clickSearch() {
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  private formatDateForBooking(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  async searchHotel(location: string, checkIn: Date, checkOut: Date) {
    await this.searchLocation(location);
    await this.selectCheckInDate(checkIn);
    await this.selectCheckOutDate(checkOut);
    await this.clickSearch();
  }
}

