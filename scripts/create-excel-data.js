const ExcelJS = require('exceljs');
const path = require('path');

async function createExcelFile() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('TestData');

  // Add headers
  worksheet.columns = [
    { header: 'Location', key: 'location', width: 20 },
    { header: 'CheckInDate', key: 'checkInDate', width: 15 },
    { header: 'CheckOutDate', key: 'checkOutDate', width: 15 }
  ];

  // Add header row styling
  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE0E0E0' }
  };

  // Calculate dates
  const checkInDate = new Date();
  checkInDate.setDate(checkInDate.getDate() + 7); // One week from today

  const checkOutDate = new Date(checkInDate);
  checkOutDate.setDate(checkOutDate.getDate() + 4); // 4 days after check-in

  // Format dates
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Add test data row
  worksheet.addRow({
    location: 'Alexandria',
    checkInDate: formatDate(checkInDate),
    checkOutDate: formatDate(checkOutDate)
  });

  // Save file
  const filePath = path.join(__dirname, '../data/test-data.xlsx');
  await workbook.xlsx.writeFile(filePath);
  console.log(`Excel file created at: ${filePath}`);
}

createExcelFile().catch(console.error);

