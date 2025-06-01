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
