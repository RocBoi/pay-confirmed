const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

// Helper function to validate required company info
function validateCompanyData(company) {
  const requiredFields = [
    'ein',
    'businessBankAccount',
    'controlNumber',
    'fedTaxId',
    'stateTaxId',
    'name',
  ];
  for (const field of requiredFields) {
    if (!company[field]) {
      throw new Error(`Missing required company field: ${field}`);
    }
  }
}

// Create a new company
async function createCompany(companyData) {
  validateCompanyData(companyData);

  const id = uuidv4();
  const {
    ein,
    businessBankAccount,
    controlNumber,
    fedTaxId,
    stateTaxId,
    name,
  } = companyData;

  const query = `
    INSERT INTO companies (id, ein, business_bank_account, control_number, fed_tax_id, state_tax_id, name)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const values = [id, ein, businessBankAccount, controlNumber, fedTaxId, stateTaxId, name];

  const res = await db.query(query, values);
  return res.rows[0];
}

// Add employee to a company
async function addEmployee(companyId, employeeData) {
  const id = uuidv4();
  const { firstName, lastName, email, position, salary } = employeeData;

  if (!firstName || !lastName || !email || !position || !salary) {
    throw new Error('Missing required employee fields');
  }

  const query = `
    INSERT INTO employees (id, company_id, first_name, last_name, email, position, salary)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const values = [id, companyId, firstName, lastName, email, position, salary];

  const res = await db.query(query, values);
  return res.rows[0];
}

// Issue payroll to employee(s)
async function issuePayroll(companyId, payrollData) {
  // payrollData: { employeeId, amount, payPeriodStart, payPeriodEnd }
  const id = uuidv4();
  const { employeeId, amount, payPeriodStart, payPeriodEnd } = payrollData;

  if (!employeeId || !amount || !payPeriodStart || !payPeriodEnd) {
    throw new Error('Missing required payroll data');
  }

  const query = `
    INSERT INTO payrolls (id, company_id, employee_id, amount, pay_period_start, pay_period_end)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [id, companyId, employeeId, amount, payPeriodStart, payPeriodEnd];

  const res = await db.query(query, values);
  return res.rows[0];
}

// Retrieve paystubs for an employee
async function getPaystubs(employeeId) {
  const query = `
    SELECT * FROM payrolls
    WHERE employee_id = $1
    ORDER BY pay_period_end DESC;
  `;
  const res = await db.query(query, [employeeId]);
  return res.rows;
}

module.exports = {
  createCompany,
  addEmployee,
  issuePayroll,
  getPaystubs,
};
