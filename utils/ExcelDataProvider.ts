import ExcelJS from 'exceljs';

export interface TestData {
  location: string;
  checkInDate: string;
  checkOutDate: string;
}

export class ExcelDataProvider {
  private workbook: ExcelJS.Workbook;
  private worksheet: ExcelJS.Worksheet | null = null;

  constructor(filePath: string) {
    this.workbook = new ExcelJS.Workbook();
    this.loadWorkbook(filePath);
  }

  private async loadWorkbook(filePath: string) {
    await this.workbook.xlsx.readFile(filePath);
    this.worksheet = this.workbook.getWorksheet(1);
  }

  async getTestData(rowNumber: number): Promise<TestData> {
    if (!this.worksheet) {
      throw new Error('Worksheet not loaded');
    }

    const row = this.worksheet.getRow(rowNumber);
    
    return {
      location: row.getCell(1).value?.toString() || '',
      checkInDate: row.getCell(2).value?.toString() || '',
      checkOutDate: row.getCell(3).value?.toString() || '',
    };
  }

  async getAllTestData(): Promise<TestData[]> {
    if (!this.worksheet) {
      throw new Error('Worksheet not loaded');
    }

    const testData: TestData[] = [];
    const rowCount = this.worksheet.rowCount;

    for (let i = 2; i <= rowCount; i++) {
      const row = this.worksheet.getRow(i);
      const location = row.getCell(1).value?.toString();
      
      // Skip empty rows
      if (!location) continue;

      testData.push({
        location: location,
        checkInDate: row.getCell(2).value?.toString() || '',
        checkOutDate: row.getCell(3).value?.toString() || '',
      });
    }

    return testData;
  }

  static parseDate(dateString: string): Date {
    // Handle different date formats
    // Format: YYYY-MM-DD or DD/MM/YYYY
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/');
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    } else if (dateString.includes('-')) {
      return new Date(dateString);
    }
    return new Date(dateString);
  }

  static calculateCheckInDate(): Date {
    const date = new Date();
    date.setDate(date.getDate() + 7); // One week from today
    return date;
  }

  static calculateCheckOutDate(checkInDate: Date): Date {
    const date = new Date(checkInDate);
    date.setDate(date.getDate() + 4); // 4 days after check-in
    return date;
  }
}

