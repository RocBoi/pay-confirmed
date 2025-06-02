// backend/controllers/companyController.js
const db = require('../db');

// Create a new company
exports.createCompany = async (req, res) => {
  try {
    const {
      name, ein, fed_tax_id, state_tax_id,
      control_number, business_bank_account
    } = req.body;

    const result = await db.query(
      `INSERT INTO companies (name, ein, fed_tax_id, state_tax_id, control_number, business_bank_account)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, ein, fed_tax_id, state_tax_id, control_number, business_bank_account]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
