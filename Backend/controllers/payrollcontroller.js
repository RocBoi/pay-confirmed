const Payroll = require('../models/Payroll');
const Business = require('../models/Business');
// Later: add PDF generator lib here for paystub

exports.issuePayroll = async (req, res) => {
  try {
    const {
      employeeName,
      payPeriod,
      grossPay,
      netPay,
      taxes,
      businessId
    } = req.body;

    const business = await Business.findById(businessId);
    if (!business) return res.status(404).json({ message: 'Business not found.' });

    const payroll = await Payroll.create({
      employeeName,
      payPeriod,
      grossPay,
      netPay,
      taxes,
      businessId
    });

    res.status(201).json({ message: 'Payroll issued.', payroll });
  } catch (err) {
    res.status(500).json({ message: 'Server error issuing payroll.', error: err.message });
  }
};

exports.getPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find({ businessId: req.params.businessId });
    res.status(200).json(payrolls);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching payrolls.', error: err.message });
  }
};

exports.downloadPaystub = async (req, res) => {
  try {
    const payroll = await Payroll.findById(req.params.id).populate('businessId');
    if (!payroll) return res.status(404).json({ message: 'Paystub not found.' });

    // TODO: Generate and send PDF here using `pdfkit` or `puppeteer`
    res.status(200).json({ message: 'Paystub download placeholder.', payroll });
  } catch (err) {
    res.status(500).json({ message: 'Error downloading paystub.', error: err.message });
  }
};
