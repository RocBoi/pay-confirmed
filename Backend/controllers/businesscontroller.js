const businessService = require('../services/businessService');

exports.registerBusiness = async (req, res) => {
  try {
    const business = await businessService.createBusiness(req.body);
    res.status(201).json(business);
  } catch (err) {
    res.status(500).json({ message: 'Business registration failed', error: err.message });
  }
};

exports.getBusiness = async (req, res) => {
  try {
    const business = await businessService.findBusinessById(req.params.id);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    res.json(business);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve business', error: err.message });
  }
};
const validateEIN = require('../utils/validateEIN');

exports.registerBusiness = async (req, res) => {
  try {
    const { ein } = req.body;

    if (!validateEIN(ein)) {
      return res.status(400).json({ message: 'Invalid EIN format. Expected format: 12-3456789' });
    }

    // continue with business creation...
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
