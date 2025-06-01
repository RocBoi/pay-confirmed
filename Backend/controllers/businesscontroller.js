const Business = require('../models/Business');

exports.registerBusiness = async (req, res) => {
  try {
    const {
      ein,
      businessName,
      bankAccountNumber,
      controlNumber,
      fedTaxId,
      stateTaxId
    } = req.body;

    const exists = await Business.findOne({ ein });
    if (exists) return res.status(400).json({ message: 'Business already registered.' });

    const business = await Business.create({
      ein,
      businessName,
      bankAccountNumber,
      controlNumber,
      fedTaxId,
      stateTaxId
    });

    res.status(201).json({ message: 'Business registered.', business });
  } catch (err) {
    res.status(500).json({ message: 'Server error during business registration.', error: err.message });
  }
};

exports.getBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) return res.status(404).json({ message: 'Business not found.' });

    res.status(200).json(business);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching business.', error: err.message });
  }
};
