import ExcelJS from 'exceljs';
import * as path from 'path';

async function generateExcel() {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Seed Cases');

  sheet.columns = [
    { header: '#', key: 'id', width: 5 },
    { header: 'Case', key: 'case', width: 35 },
    { header: 'brandName', key: 'brandName', width: 30 },
    { header: 'yearFounded', key: 'yearFounded', width: 15 },
    { header: 'headquarters', key: 'headquarters', width: 30 },
    { header: 'numberOfLocations', key: 'numberOfLocations', width: 20 },
    { header: 'Why this case matters', key: 'why', width: 50 },
  ];

  const rows = [
    { id: 1, case: 'Typical valid entry', brandName: 'Realistic Brand', yearFounded: 2005, headquarters: 'New York, USA', numberOfLocations: 120, why: 'Tests the happy path with normal valid data.' },
    { id: 2, case: 'Very old brand', brandName: 'Historic Brand', yearFounded: 1600, headquarters: 'London, UK', numberOfLocations: 10, why: 'Tests the minimum allowed year (1600).' },
    { id: 3, case: 'Brand founded this year', brandName: 'Startup 2026', yearFounded: 2026, headquarters: 'San Francisco, USA', numberOfLocations: 2, why: 'Tests the maximum allowed year (current year).' },
    { id: 4, case: 'Single location', brandName: 'Local Shop', yearFounded: 2015, headquarters: 'Austin, USA', numberOfLocations: 1, why: 'Tests the minimum allowed locations (1).' },
    { id: 5, case: 'Massive chain', brandName: 'Global Megacorp', yearFounded: 1950, headquarters: 'Tokyo, Japan', numberOfLocations: 55000, why: 'Tests a very large number of locations.' },
    { id: 6, case: 'Long brand name', brandName: 'The Super Extremely Long Company Name That Might Be A Full Sentence', yearFounded: 1980, headquarters: 'Berlin, Germany', numberOfLocations: 45, why: 'Tests string length limits and trimming.' },
    { id: 7, case: 'Headquarters with special characters', brandName: 'Latam Brand', yearFounded: 1999, headquarters: 'São Paulo', numberOfLocations: 15, why: 'Tests unicode/special characters in string fields.' },
    { id: 8, case: 'Brand name that needs trimming', brandName: '   Brand With Spaces   ', yearFounded: 2010, headquarters: 'Paris, France', numberOfLocations: 5, why: 'Tests Mongoose trim: true on string fields.' },
    { id: 9, case: 'Mid-range founding year', brandName: 'Vintage Co', yearFounded: 1900, headquarters: 'Rome, Italy', numberOfLocations: 80, why: 'Tests a year right in the middle of the valid range.' },
    { id: 10, case: 'Recently founded, many locations', brandName: 'Hyper Growth Inc', yearFounded: 2023, headquarters: 'Dubai, UAE', numberOfLocations: 15000, why: 'Tests an unlikely but valid combination of recent founding and many locations.' },
  ];

  sheet.addRows(rows);

  sheet.getRow(1).font = { bold: true };

  const filePath = path.join(__dirname, '..', 'seed-cases.xlsx');
  await workbook.xlsx.writeFile(filePath);
  console.log(`Excel file generated at: ${filePath}`);
}

generateExcel().catch(console.error);
