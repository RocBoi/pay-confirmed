// File: backend/models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ name: { type: String, required: true }, email: { type: String, unique: true, required: true }, password: { type: String, required: true } }, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

// File: backend/models/Business.js

const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({ ein: { type: String, required: true, unique: true }, businessName: { type: String, required: true }, bankAccountNumber: { type: String, required: true }, controlNumber: { type: String, required: true }, fedTaxId: { type: String, required: true }, stateTaxId: { type: String, required: true } }, { timestamps: true });

module.exports = mongoose.model('Business', businessSchema);

// File: backend/models/Payroll.js

const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({ employeeName: { type: String, required: true }, payPeriod: { type: String, required: true }, grossPay: { type: Number, required: true }, netPay: { type: Number, required: true }, taxes: { type: Number, required: true }, businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true } }, { timestamps: true });

module.exports = mongoose.model('Payroll', payrollSchema);

