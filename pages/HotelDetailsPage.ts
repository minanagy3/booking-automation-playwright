import { Page, Locator } from '@playwright/test';

export class HotelDetailsPage {
  readonly page: Page;
  readonly checkInDateDisplay: Locator;
  readonly checkOutDateDisplay: Locator;
  readonly reserveButton: Locator;
  readonly bedSelection: Locator;
  readonly amountSelection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkInDateDisplay = page.locator('[data-testid="date-display-field-start"]');
    this.checkOutDateDisplay = page.locator('[data-testid="date-display-field-end"]');
    this.reserveButton = page.locator('button:has-text("I\'ll reserve")');
    this.bedSelection = page.locator('select[name*="bed"], input[type="radio"][name*="bed"]').first();
    this.amountSelection = page.locator('select[name*="amount"], input[type="number"]').first();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
  }

  async getCheckInDate(): Promise<string> {
    return await this.checkInDateDisplay.textContent() || '';
  }

  async getCheckOutDate(): Promise<string> {
    return await this.checkOutDateDisplay.textContent() || '';
  }

  async selectBedAndAmount() {
    // Try to select bed type if dropdown exists
    try {
      const bedDropdown = this.page.locator('select').first();
      if (await bedDropdown.count() > 0) {
        await bedDropdown.selectOption({ index: 0 });
      }
    } catch (e) {
      // Bed selection might not be available
    }

    // Try to select amount if input exists
    try {
      const amountInput = this.page.locator('input[type="number"]').first();
      if (await amountInput.count() > 0) {
        await amountInput.fill('1');
      }
    } catch (e) {
      // Amount selection might not be available
    }

    await this.page.waitForTimeout(1000);
  }

  async clickReserveButton() {
    // Scroll to reserve button
    await this.reserveButton.scrollIntoViewIfNeeded();
    await this.reserveButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}

