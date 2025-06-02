const db = require('../db');
const { v4: uuidv4 } = require('uuid');

async function issuePayroll(companyId, {
  employee_id,
  amount,
  pay_period_start,
  pay_period_end,
}) {
  const id = uuidv4();
  const query = `
    INSERT INTO payrolls
      (id, company_id, employee_id, amount, pay_period_start, pay_period_end)
    VALUES
      ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [id, companyId, employee_id, amount, pay_period_start, pay_period_end];
  const { rows } = await db.query(query, values);
  return rows[0];
}

async function getPayrollsByEmployee(employeeId) {
  const query = `
    SELECT * FROM payrolls
    WHERE employee_id = $1
    ORDER BY pay_period_end DESC;
  `;
  const { rows } = await db.query(query, [employeeId]);
  return rows;
}

module.exports = {
  issuePayroll,
  getPayrollsByEmployee,
};
