const db = require('../db');
const { v4: uuidv4 } = require('uuid');

async function createCompany({
  ein,
  business_bank_account,
  control_number,
  fed_tax_id,
  state_tax_id,
  name,
}) {
  const id = uuidv4();
  const query = `
    INSERT INTO companies
      (id, ein, business_bank_account, control_number, fed_tax_id, state_tax_id, name)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const values = [id, ein, business_bank_account, control_number, fed_tax_id, state_tax_id, name];
  const { rows } = await db.query(query, values);
  return rows[0];
}

async function getCompanyById(id) {
  const { rows } = await db.query('SELECT * FROM companies WHERE id = $1', [id]);
  return rows[0];
}

module.exports = {
  createCompany,
  getCompanyById,
};
