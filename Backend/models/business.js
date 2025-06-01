const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  ein: {
    type: String,
    required: true,
    unique: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  bankAccountNumber: {
    type: String,
    required: true,
  },
  controlNumber: {
    type: String,
    required: true,
  },
  fedTaxId: {
    type: String,
    required: true,
  },
  stateTaxId: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Business', businessSchema);
