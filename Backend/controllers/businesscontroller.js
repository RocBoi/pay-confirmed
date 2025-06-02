const businessServices = require('../services/businessServices');

async function createCompany(req, res) {
  try {
    const company = await businessServices.createCompany(req.body);
    res.status(201).json(company);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function addEmployee(req, res) {
  try {
    const { companyId } = req.params;
    const employee = await businessServices.addEmployee(companyId, req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function issuePayroll(req, res) {
  try {
    const { companyId } = req.params;
    const payroll = await businessServices.issuePayroll(companyId, req.body);
    res.status(201).json(payroll);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getPaystubs(req, res) {
  try {
    const { employeeId } = req.params;
    const paystubs = await businessServices.getPaystubs(employeeId);
    res.status(200).json(paystubs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  createCompany,
  addEmployee,
  issuePayroll,
  getPaystubs,
};
