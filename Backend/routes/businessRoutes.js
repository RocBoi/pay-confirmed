const express = require('express');
const router = express.Router();
const { registerBusiness, getBusiness } = require('../controllers/businessController');

// POST /api/business/register
router.post('/register', registerBusiness);

// GET /api/business/:id
router.get('/:id', getBusiness);

module.exports = router;
