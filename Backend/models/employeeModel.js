const db = require('../db');
const { v4: uuidv4 } = require('uuid');

async function addEmployee(companyId, {
  first_name,
  last_name,
  email,
  position,
  salary,
}) {
  const id = uuidv4();
  const query = `
    INSERT INTO employees
      (id, company_id, first_name, last_name, email, position, salary)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const values = [id, companyId, first_name, last_name, email, position, salary];
  const { rows } = await db.query(query, values);
  return rows[0];
}

async function getEmployeeById(id) {
  const { rows } = await db.query('SELECT * FROM employees WHERE id = $1', [id]);
  return rows[0];
}

module.exports = {
  addEmployee,
  getEmployeeById,
};
