// utils/generatePayStubPDF.js
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

async function generatePayStubPDF(data) {
  if (!data || !data.employeeName || !data.grossPay) throw new Error('Invalid data');

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const drawText = (text, y) => page.drawText(text, { x: 50, y, size: 12, font, color: rgb(0, 0, 0) });

  let y = height - 50;
  drawText(`${data.companyName}`, y);
  y -= 20;
  drawText(`Employee: ${data.employeeName}`, y);
  y -= 20;
  drawText(`Pay Period: ${data.payPeriod}`, y);
  y -= 20;
  drawText(`Pay Date: ${data.payDate}`, y);
  y -= 20;
  drawText(`Gross Pay: $${data.grossPay}`, y);
  y -= 20;
  drawText(`Federal Tax: $${data.federalTax}`, y);
  y -= 20;
  drawText(`State Tax: $${data.stateTax}`, y);
  y -= 20;
  drawText(`Net Pay: $${data.netPay}`, y);

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

module.exports = { generatePayStubPDF };
