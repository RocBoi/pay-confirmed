const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
  },
  payPeriod: {
    type: String,
    required: true,
  },
  grossPay: {
    type: Number,
    required: true,
  },
  netPay: {
    type: Number,
    required: true,
  },
  taxes: {
    type: Number,
    required: true,
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Payroll', payrollSchema);
