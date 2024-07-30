import { Page, Locator } from '@playwright/test';

export class ReservationPage {
  readonly page: Page;
  readonly hotelNameBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.hotelNameBox = page.locator('h2:has-text("Tolip Hotel Alexandria"), div:has-text("Tolip Hotel Alexandria")').first();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
  }

  async getHotelName(): Promise<string> {
    const hotelNameElement = await this.page.locator('text=Tolip Hotel Alexandria').first();
    return await hotelNameElement.textContent() || '';
  }

  async verifyHotelName(expectedName: string): Promise<boolean> {
    const hotelName = await this.getHotelName();
    return hotelName.includes(expectedName);
  }
}

