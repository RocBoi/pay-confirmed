const PDFDocument = require('pdfkit');
const fs = require('fs');

const generatePaystubPDF = (payroll, outputPath) => {
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(outputPath));

  doc.fontSize(18).text('Pay Confirmed – Payroll Stub', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Employee: ${payroll.employeeName}`);
  doc.text(`Pay Period: ${payroll.payPeriod}`);
  doc.text(`Gross Pay: $${payroll.grossPay}`);
  doc.text(`Taxes: $${payroll.taxes}`);
  doc.text(`Net Pay: $${payroll.netPay}`);
  doc.end();
};

module.exports = generatePaystubPDF;
