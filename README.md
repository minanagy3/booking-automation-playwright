# Booking.com Automation Tests

This project contains automated tests for Booking.com using Playwright, TypeScript, and Page Object Model (POM) design pattern.

## 📋 Requirements

- Node.js (v16 or higher)
- npm or yarn

## 🚀 Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

3. **Create Excel test data file:**
   ```bash
   node scripts/create-excel-data.js
   ```

## 📁 Project Structure

```
booking-automation-playwright/
├── pages/              # Page Object Model classes
│   ├── HomePage.ts
│   ├── SearchResultsPage.ts
│   ├── HotelDetailsPage.ts
│   └── ReservationPage.ts
├── tests/              # Test files
│   └── booking-flow.spec.ts
├── utils/              # Utility classes
│   ├── ExcelDataProvider.ts
│   └── DateHelper.ts
├── data/               # Test data files
│   └── test-data.xlsx
├── scripts/            # Helper scripts
│   └── create-excel-data.js
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

## 🧪 Test Cases

The project includes the following test cases:

1. **Complete booking flow** - End-to-end test covering:
   - Opening booking.com
   - Searching for Alexandria location
   - Selecting check-in (1 week from today) and check-out (4 days after check-in) dates
   - Finding and selecting Tolip Hotel Alexandria
   - Selecting bed and amount
   - Clicking "I'll reserve" button

2. **Verify check-in and check-out dates in details page** - Asserts that the chosen dates are displayed correctly on the hotel details page.

3. **Verify hotel name in reservation page** - Asserts that "Tolip Hotel Alexandria" is shown in the reservation page.

## 📊 Test Data

Test data is stored in `data/test-data.xlsx` with the following columns:
- **Location**: Search location (e.g., "Alexandria")
- **CheckInDate**: Check-in date (format: DD/MM/YYYY)
- **CheckOutDate**: Check-out date (format: DD/MM/YYYY)

If dates are not provided in Excel, the system will automatically calculate:
- Check-in: 1 week from today
- Check-out: 4 days after check-in

## 🏃 Running Tests

### Run all tests:
```bash
npm test
```

### Run tests in headed mode (see browser):
```bash
npm run test:headed
```

### Run tests in debug mode:
```bash
npm run test:debug
```

### Run tests with UI mode:
```bash
npm run test:ui
```

### View test report:
```bash
npm run report
```

## 🎯 Features

- ✅ Page Object Model (POM) design pattern
- ✅ Excel data provider for test data
- ✅ TypeScript for type safety
- ✅ Playwright for reliable browser automation
- ✅ Automatic date calculation
- ✅ Comprehensive test coverage

## 📝 Notes

- The tests handle dynamic content and may need selector adjustments based on Booking.com's UI changes
- Cookies popup is automatically handled
- Tests include proper waits and error handling
- Screenshots and videos are captured on test failures

## 🔧 Configuration

Edit `playwright.config.ts` to modify:
- Test timeout
- Browser configuration
- Retry settings
- Reporter options

## 📄 License

ISC

## 👤 Author

Junior QA Engineer

