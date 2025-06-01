const payrollService = require('../services/payrollService');
const PDFDocument = require('pdfkit');

exports.issuePayroll = async (req, res) => {
  try {
    const payroll = await payrollService.createPayroll(req.body);
    res.status(201).json(payroll);
  } catch (err) {
    res.status(500).json({ message: 'Payroll issuance failed', error: err.message });
  }
};

exports.getPayrolls = async (req, res) => {
  try {
    const payrolls = await payrollService.getPayrollsByBusiness(req.params.businessId);
    res.json(payrolls);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch payrolls', error: err.message });
  }
};

exports.downloadPaystub = async (req, res) => {
  try {
    const payroll = await payrollService.getPayrollById(req.params.id);
    if (!payroll) {
      return res.status(404).json({ message: 'Payroll record not found' });
    }

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=paystub-${payroll._id}.pdf`);
    doc.pipe(res);

    doc.fontSize(20).text('Pay Confirmed - Paystub', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Employee: ${payroll.employeeName}`);
    doc.text(`Pay Period: ${payroll.payPeriod}`);
    doc.text(`Gross Pay: $${payroll.grossPay.toFixed(2)}`);
    doc.text(`Taxes: $${payroll.taxes.toFixed(2)}`);
    doc.text(`Net Pay: $${payroll.netPay.toFixed(2)}`);
    doc.end();
  } catch (err) {
    res.status(500).json({ message: 'Failed to download paystub', error: err.message });
  }
};
const formatCurrency = require('../utils/formatCurrency');
const generatePaystubPDF = require('../utils/generatePaystubPDF');
const path = require('path');

exports.issuePayroll = async (req, res) => {
  try {
    const { employeeName, payPeriod, grossPay, taxes, netPay } = req.body;

    // Save to DB...

    const outputPath = path.join(__dirname, `../generated/paystub_${employeeName.replace(/\s+/g, '_')}.pdf`);
    generatePaystubPDF(req.body, outputPath);

    res.status(201).json({
      message: 'Payroll issued',
      employeeName,
      grossPay: formatCurrency(grossPay),
      taxes: formatCurrency(taxes),
      netPay: formatCurrency(netPay),
      paystubPath: outputPath
    });
  } catch (error) {
    res.status(500).json({ message: 'Error issuing payroll' });
  }
};
