const express = require('express');
const router = express.Router();
const {
  issuePayroll,
  getPayrolls,
  downloadPaystub
} = require('../controllers/payrollController');

// POST /api/payroll/issue
router.post('/issue', issuePayroll);

// GET /api/payroll/business/:businessId
router.get('/business/:businessId', getPayrolls);

// GET /api/payroll/paystub/:id
router.get('/paystub/:id', downloadPaystub);

module.exports = router;
