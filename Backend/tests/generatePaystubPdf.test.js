const generatePaystubPDF = require('../../utils/generatePaystubPDF');
const fs = require('fs');

describe('generatePaystubPDF Utility', () => {
  const payroll = {
    employeeName: 'Test User',
    payPeriod: 'May 2025',
    grossPay: 3000,
    taxes: 600,
    netPay: 2400,
  };

  const path = './test-paystub.pdf';

  afterAll(() => {
    if (fs.existsSync(path)) fs.unlinkSync(path);
  });

  test('generates a PDF file', (done) => {
    generatePaystubPDF(payroll, path);
    setTimeout(() => {
      expect(fs.existsSync(path)).toBe(true);
      done();
    }, 500); // wait for file stream to finish
  });
});
