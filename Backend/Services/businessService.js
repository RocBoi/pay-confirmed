const Business = require('../models/Business');

exports.findBusinessByEIN = async (ein) => {
  return await Business.findOne({ ein });
};

exports.findBusinessById = async (id) => {
  return await Business.findById(id);
};

exports.createBusiness = async (data) => {
  return await Business.create(data);
};
