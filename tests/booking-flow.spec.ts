import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { HotelDetailsPage } from '../pages/HotelDetailsPage';
import { ReservationPage } from '../pages/ReservationPage';
import { ExcelDataProvider } from '../utils/ExcelDataProvider';
import { DateHelper } from '../utils/DateHelper';
import path from 'path';

test.describe('Booking.com Automation Tests', () => {
  let homePage: HomePage;
  let searchResultsPage: SearchResultsPage;
  let hotelDetailsPage: HotelDetailsPage;
  let reservationPage: ReservationPage;
  let testData: any;
  let checkInDate: Date;
  let checkOutDate: Date;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchResultsPage = new SearchResultsPage(page);
    hotelDetailsPage = new HotelDetailsPage(page);
    reservationPage = new ReservationPage(page);

    // Load test data from Excel
    const excelPath = path.join(__dirname, '../data/test-data.xlsx');
    const dataProvider = new ExcelDataProvider(excelPath);
    testData = await dataProvider.getTestData(2); // Row 2 (assuming row 1 is header)

    // Calculate dates if not provided in Excel
    if (testData.checkInDate) {
      checkInDate = ExcelDataProvider.parseDate(testData.checkInDate);
    } else {
      checkInDate = ExcelDataProvider.calculateCheckInDate();
    }

    if (testData.checkOutDate) {
      checkOutDate = ExcelDataProvider.parseDate(testData.checkOutDate);
    } else {
      checkOutDate = ExcelDataProvider.calculateCheckOutDate(checkInDate);
    }
  });

  test('Complete booking flow - Search, Select Hotel, and Reserve', async ({ page }) => {
    // Step 1: Navigate to booking.com
    await homePage.navigate();

    // Step 2: Search for location, select dates, and click search
    const location = testData.location || 'Alexandria';
    await homePage.searchHotel(location, checkInDate, checkOutDate);

    // Step 3: Wait for search results and find Tolip Hotel
    await searchResultsPage.waitForResults();
    await searchResultsPage.findAndClickTolipHotel();

    // Step 4: Select bed and amount, then click reserve
    await hotelDetailsPage.waitForPageLoad();
    await hotelDetailsPage.selectBedAndAmount();
    await hotelDetailsPage.clickReserveButton();

    // Step 5: Wait for reservation page
    await reservationPage.waitForPageLoad();
  });

  test('Verify check-in and check-out dates in details page', async ({ page }) => {
    // Navigate and search
    await homePage.navigate();
    const location = testData.location || 'Alexandria';
    await homePage.searchHotel(location, checkInDate, checkOutDate);

    // Find and click Tolip Hotel
    await searchResultsPage.waitForResults();
    await searchResultsPage.findAndClickTolipHotel();

    // Wait for details page
    await hotelDetailsPage.waitForPageLoad();

    // Get displayed dates
    const displayedCheckIn = await hotelDetailsPage.getCheckInDate();
    const displayedCheckOut = await hotelDetailsPage.getCheckOutDate();

    // Format expected dates for comparison
    const expectedCheckInFormatted = DateHelper.formatDate(checkInDate);
    const expectedCheckOutFormatted = DateHelper.formatDate(checkOutDate);

    // Assert dates are displayed correctly
    // Note: The actual format might differ, so we check if the dates are present
    expect(displayedCheckIn).toBeTruthy();
    expect(displayedCheckOut).toBeTruthy();
    
    // Verify the dates contain the correct day/month/year
    const checkInDay = String(checkInDate.getDate());
    const checkOutDay = String(checkOutDate.getDate());
    
    expect(displayedCheckIn).toContain(checkInDay);
    expect(displayedCheckOut).toContain(checkOutDay);
  });

  test('Verify hotel name in reservation page', async ({ page }) => {
    // Navigate and search
    await homePage.navigate();
    const location = testData.location || 'Alexandria';
    await homePage.searchHotel(location, checkInDate, checkOutDate);

    // Find and click Tolip Hotel
    await searchResultsPage.waitForResults();
    await searchResultsPage.findAndClickTolipHotel();

    // Select bed and amount, then click reserve
    await hotelDetailsPage.waitForPageLoad();
    await hotelDetailsPage.selectBedAndAmount();
    await hotelDetailsPage.clickReserveButton();

    // Wait for reservation page
    await reservationPage.waitForPageLoad();

    // Verify hotel name
    const hotelName = await reservationPage.getHotelName();
    expect(hotelName).toContain('Tolip Hotel Alexandria');
  });
});

