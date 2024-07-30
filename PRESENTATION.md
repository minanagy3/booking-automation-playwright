# Playwright Automation Framework - Team Presentation

**Presented by:** [Your Name]  
**Date:** [Date]  
**Project:** Booking.com Automation with Playwright & TypeScript

---

## Slide 1: Title Slide

# 🎭 Playwright Automation Framework
## Booking.com Test Automation Project

**Technology Stack:**
- Playwright
- TypeScript
- Page Object Model
- Data-Driven Testing

---

## Slide 2: Agenda

1. **What is Playwright?**
2. **Why Playwright?**
3. **Project Overview**
4. **Architecture & Design Patterns**
5. **Key Features**
6. **Code Walkthrough**
7. **Best Practices**
8. **Demo**
9. **Q&A**

---

## Slide 3: What is Playwright?

### Modern Web Automation Framework

- **Created by:** Microsoft
- **Purpose:** End-to-end testing for web applications
- **Supports:** Chrome, Firefox, Safari, Edge
- **Languages:** JavaScript, TypeScript, Python, Java, C#

### Key Capabilities
- ✅ Browser automation
- ✅ API testing
- ✅ Mobile testing
- ✅ Visual testing
- ✅ Network interception

---

## Slide 4: Why Playwright?

### Comparison with Other Tools

| Feature | Selenium | Cypress | Playwright |
|---------|----------|---------|------------|
| Speed | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Multi-browser | ✅ | ❌ | ✅ |
| Auto-waiting | ⚠️ | ✅ | ✅ |
| API Testing | ❌ | ⚠️ | ✅ |
| Mobile | ⚠️ | ❌ | ✅ |

### Playwright Advantages
- 🚀 **Fast** - Parallel execution
- 🎯 **Reliable** - Auto-waits for elements
- 🌐 **Multi-browser** - One codebase, all browsers
- 🔧 **Modern** - Built for modern web apps
- 📊 **Great Tools** - Built-in debugging & reporting

---

## Slide 5: Project Overview

### Booking.com Automation Project

**Objective:** Automate hotel booking flow on Booking.com

**Test Scenarios:**
1. Complete booking flow (end-to-end)
2. Verify dates in hotel details page
3. Verify hotel name in reservation page

**Technology Stack:**
- Playwright 1.40.0
- TypeScript 5.3.3
- ExcelJS 4.4.0 (for data)
- Page Object Model pattern

---

## Slide 6: Project Structure

```
booking-automation-playwright/
├── pages/                    # Page Object Model
│   ├── HomePage.ts          # Homepage interactions
│   ├── SearchResultsPage.ts # Search results handling
│   ├── HotelDetailsPage.ts  # Hotel details page
│   └── ReservationPage.ts   # Reservation page
├── tests/                    # Test files
│   └── booking-flow.spec.ts # Test scenarios
├── utils/                    # Utilities
│   ├── ExcelDataProvider.ts # Excel data reading
│   └── DateHelper.ts        # Date utilities
├── data/                     # Test data
│   └── test-data.xlsx       # Excel test data
└── playwright.config.ts      # Configuration
```

---

## Slide 7: Architecture - Page Object Model

### What is POM?

**Definition:** Design pattern where each web page is represented by a class

### Benefits:
- ✅ **Reusability** - Write once, use many times
- ✅ **Maintainability** - Change in one place
- ✅ **Readability** - Clean, organized code
- ✅ **Testability** - Easy to write tests

### Example:
```typescript
// Page Class
class HomePage {
  async searchHotel(location, checkIn, checkOut) {
    // All search logic here
  }
}

// Test
test('search hotel', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.searchHotel('Alexandria', date1, date2);
});
```

---

## Slide 8: Key Features - Data-Driven Testing

### Excel Data Provider

**Why Excel?**
- Non-technical team members can update test data
- Easy to manage multiple test scenarios
- Visual representation of data

**How it Works:**
```typescript
// Read from Excel
const data = await excelProvider.getTestData(2);

// Use in test
await homePage.searchHotel(
  data.location,
  data.checkInDate,
  data.checkOutDate
);
```

**Excel Structure:**
| Location | CheckInDate | CheckOutDate |
|----------|-------------|--------------|
| Alexandria | 15/03/2024 | 19/03/2024 |

---

## Slide 9: Key Features - Automatic Date Calculation

### Smart Date Handling

**Problem:** Test dates become outdated

**Solution:** Automatic calculation
```typescript
// If Excel has no date, calculate automatically
if (!testData.checkInDate) {
  checkInDate = calculateCheckInDate(); // 1 week from today
  checkOutDate = calculateCheckOutDate(checkIn); // +4 days
}
```

**Benefits:**
- ✅ Tests always use valid dates
- ✅ No manual date updates needed
- ✅ Tests remain relevant

---

## Slide 10: Code Walkthrough - Test Structure

### Test File Structure

```typescript
test.describe('Booking.com Automation Tests', () => {
  // Setup - runs before each test
  test.beforeEach(async ({ page }) => {
    // Initialize page objects
    // Load test data
    // Calculate dates
  });

  // Test case 1
  test('Complete booking flow', async ({ page }) => {
    // Test steps
  });

  // Test case 2
  test('Verify dates', async ({ page }) => {
    // Verification steps
  });
});
```

**Key Points:**
- `test.describe()` - Groups related tests
- `test.beforeEach()` - Setup before each test
- `test()` - Individual test case
- `async/await` - Handles asynchronous operations

---

## Slide 11: Code Walkthrough - Page Object

### HomePage Class Example

```typescript
export class HomePage {
  // Properties
  readonly page: Page;
  readonly searchInput: Locator;

  // Constructor
  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('input[name="ss"]');
  }

  // Methods
  async navigate() {
    await this.page.goto('https://www.booking.com');
  }

  async searchLocation(location: string) {
    await this.searchInput.fill(location);
    await this.page.keyboard.press('Enter');
  }
}
```

**Concepts:**
- `readonly` - Property can't be changed after initialization
- `Locator` - Element selector with auto-waiting
- `async/await` - Handles asynchronous browser operations

---

## Slide 12: Code Walkthrough - Locators

### Finding Elements

```typescript
// 1. CSS Selector
page.locator('input[name="ss"]')

// 2. Text Content
page.locator('text=Search')

// 3. Data Attribute (Best Practice)
page.locator('[data-testid="search-button"]')

// 4. Role-based (Accessibility)
page.getByRole('button', { name: 'Search' })
```

### Why Different Locators?
- **CSS Selector** - Fast, but can break with UI changes
- **Text** - Easy to read, but language-dependent
- **Data-testid** - Most stable, recommended
- **Role-based** - Accessibility-friendly, stable

---

## Slide 13: Code Walkthrough - Waiting

### Automatic Waiting

```typescript
// Playwright waits automatically!
await page.locator('button').click();
// ↑ Waits for button to be:
//   - Attached to DOM
//   - Visible
//   - Stable (not animating)
//   - Enabled
//   - Receives events
```

### Explicit Waits (When Needed)

```typescript
// Wait for selector
await page.waitForSelector('button');

// Wait for network
await page.waitForLoadState('networkidle');

// Wait for condition
await page.waitForFunction(() => 
  document.querySelector('.results').children.length > 0
);
```

**Key Point:** Playwright's auto-waiting makes tests more reliable!

---

## Slide 14: Code Walkthrough - Assertions

### Verification in Tests

```typescript
// Check visibility
await expect(page.locator('h1')).toBeVisible();

// Check text
await expect(page.locator('h1')).toHaveText('Welcome');

// Check contains text
await expect(page.locator('p')).toContainText('Hello');

// Check URL
await expect(page).toHaveURL('https://example.com');

// Check count
await expect(page.locator('.item')).toHaveCount(5);
```

**Assertion Types:**
- **Visibility** - Element is visible
- **Text** - Exact text match
- **Contains** - Partial text match
- **State** - Enabled, checked, etc.
- **Count** - Number of elements

---

## Slide 15: Best Practices

### 1. Page Object Model
✅ **Do:** Organize code in page classes  
❌ **Don't:** Put all code in test files

### 2. Stable Selectors
✅ **Do:** Use data-testid attributes  
❌ **Don't:** Use fragile CSS selectors

### 3. Explicit Waits
✅ **Do:** Wait for specific conditions  
❌ **Don't:** Use hard timeouts (waitForTimeout)

### 4. Error Handling
✅ **Do:** Handle expected errors gracefully  
❌ **Don't:** Let tests crash unexpectedly

### 5. Data Separation
✅ **Do:** Keep test data separate  
❌ **Don't:** Hardcode values in tests

---

## Slide 16: Configuration

### Playwright Config Highlights

```typescript
export default defineConfig({
  testDir: './tests',              // Where tests are
  fullyParallel: true,              // Run in parallel
  retries: process.env.CI ? 2 : 0, // Retry in CI
  workers: process.env.CI ? 1 : undefined, // Parallel workers
  
  use: {
    trace: 'on-first-retry',       // Debug traces
    screenshot: 'only-on-failure',  // Screenshots
    video: 'retain-on-failure',     // Videos
  },
  
  projects: [
    { name: 'chromium', use: {...} },
    // Add more browsers
  ],
});
```

---

## Slide 17: Test Execution

### Running Tests

```bash
# Run all tests (headless)
npm test

# Run with browser visible
npm run test:headed

# Debug mode (step by step)
npm run test:debug

# Interactive UI mode
npm run test:ui

# View HTML report
npm run report
```

### Test Reports
- **HTML Report** - Interactive, visual
- **List Report** - Console output
- **Screenshots** - On failure
- **Videos** - On failure
- **Traces** - For debugging

---

## Slide 18: Demo - Live Test Execution

### What We'll See:

1. **Browser Opens** (if headed mode)
2. **Navigate to Booking.com**
3. **Search for Alexandria**
4. **Select Dates**
5. **Find Tolip Hotel**
6. **Select Room Options**
7. **Click Reserve**
8. **Verify Results**

### Expected Outcome:
✅ All tests pass  
✅ Screenshots captured  
✅ Report generated

---

## Slide 19: Benefits for the Team

### For QA Engineers:
- ✅ Faster test execution
- ✅ More reliable tests
- ✅ Better debugging tools
- ✅ Easy to maintain

### For Developers:
- ✅ Fast feedback
- ✅ Catch bugs early
- ✅ Regression testing
- ✅ CI/CD integration

### For Business:
- ✅ Higher quality
- ✅ Faster releases
- ✅ Reduced manual testing
- ✅ Cost savings

---

## Slide 20: Learning Resources

### For Beginners:
1. **BEGINNER_GUIDE.md** - Step-by-step tutorial
2. **CODE_EXPLANATION.md** - Line-by-line explanations
3. **PLAYWRIGHT_LEARNING_PATH.md** - 6-week study plan

### Official Resources:
- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)

### Community:
- Playwright Discord
- GitHub Discussions
- Stack Overflow

---

## Slide 21: Next Steps

### Immediate Actions:
1. ✅ Review the code
2. ✅ Run the tests locally
3. ✅ Read the documentation
4. ✅ Try modifying tests

### For Team Members:
1. 📚 Complete beginner guide
2. 🏋️ Practice with exercises
3. 🏗️ Build your own project
4. 🤝 Share knowledge

### For the Project:
1. 🔄 Add more test scenarios
2. 🌐 Support more browsers
3. 📊 Enhance reporting
4. 🚀 Integrate with CI/CD

---

## Slide 22: Q&A Session

### Common Questions:

**Q: How long to learn Playwright?**  
A: 2-4 weeks for basics, 6-8 weeks to be proficient

**Q: Can we use this for other websites?**  
A: Yes! The patterns are reusable

**Q: How to handle dynamic content?**  
A: Use explicit waits and stable selectors

**Q: What about mobile testing?**  
A: Playwright supports mobile emulation

**Q: CI/CD integration?**  
A: Yes, works with GitHub Actions, Jenkins, etc.

---

## Slide 23: Thank You!

# Questions?

**Contact:**
- Email: [your-email]
- GitHub: [your-github]
- Project: https://github.com/minanagy3/booking-automation-playwright

**Resources:**
- Documentation in repository
- Beginner guides available
- Team training sessions

---

## Slide 24: Appendix - Key Commands

### Essential Commands

```bash
# Setup
npm install
npx playwright install

# Run Tests
npm test
npm run test:headed
npm run test:debug

# Utilities
npm run create-excel
npm run report

# Debugging
npx playwright codegen https://example.com
npx playwright show-trace trace.zip
```

---

## Slide 25: Appendix - Project Statistics

### Code Metrics:
- **Total Files:** 15
- **Lines of Code:** ~800
- **Test Cases:** 3
- **Page Objects:** 4
- **Utilities:** 2

### Coverage:
- ✅ Homepage interactions
- ✅ Search functionality
- ✅ Hotel selection
- ✅ Date handling
- ✅ Reservation flow

---

**End of Presentation**

---

## 📝 Presentation Tips

### For Presenter:
1. **Practice** - Run through slides 2-3 times
2. **Demo** - Have test execution ready
3. **Timing** - Allow 30-45 minutes
4. **Q&A** - Reserve 10-15 minutes
5. **Handouts** - Share documentation links

### Slide Customization:
- Add your team's logo
- Include real screenshots
- Add project-specific metrics
- Customize examples to your domain

### Delivery Tips:
- Start with "Why" before "How"
- Use analogies for complex concepts
- Pause for questions
- Encourage participation
- End with actionable next steps

