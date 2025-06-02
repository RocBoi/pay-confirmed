// tests/generatePayStubPDF.test.js
const fs = require('fs');
const path = require('path');
const { generatePayStubPDF } = require('../utils/generatePayStubPDF');

describe('generatePayStubPDF utility', () => {
  const samplePayData = {
    employeeName: 'Marquez Ross',
    payPeriod: 'May 2025',
    grossPay: 5000,
    federalTax: 500,
    stateTax: 250,
    netPay: 4250,
    companyName: 'Pay Confirmed LLC',
    payDate: '2025-05-31'
  };

  it('should generate a valid PDF buffer', async () => {
    const pdfBuffer = await generatePayStubPDF(samplePayData);
    
    expect(pdfBuffer).toBeInstanceOf(Buffer);
    expect(pdfBuffer.length).toBeGreaterThan(0);
  });

  it('should write PDF to disk (test file)', async () => {
    const outputPath = path.join(__dirname, 'test-paystub.pdf');
    const pdfBuffer = await generatePayStubPDF(samplePayData);
    
    fs.writeFileSync(outputPath, pdfBuffer);
    
    const exists = fs.existsSync(outputPath);
    expect(exists).toBe(true);

    // Optional cleanup
    fs.unlinkSync(outputPath);
  });

  it('throws error on invalid input', async () => {
    await expect(generatePayStubPDF(null)).rejects.toThrow();
  });
});
