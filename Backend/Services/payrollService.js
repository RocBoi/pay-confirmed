const Payroll = require('../models/Payroll');

exports.createPayroll = async (data) => {
  return await Payroll.create(data);
};

exports.getPayrollsByBusiness = async (businessId) => {
  return await Payroll.find({ businessId });
};

exports.getPayrollById = async (id) => {
  return await Payroll.findById(id).populate('businessId');
};
