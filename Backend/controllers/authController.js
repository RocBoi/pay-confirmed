// File: backend/controllers/authController.js

const jwt = require('jsonwebtoken'); const bcrypt = require('bcryptjs'); const User = require('../models/User');

exports.register = async (req, res) => { const { name, email, password } = req.body; try { const existingUser = await User.findOne({ email }); if (existingUser) return res.status(400).json({ message: 'User already exists' });

const hashedPassword = await bcrypt.hash(password, 12);

const user = await User.create({ name, email, password: hashedPassword });
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

res.status(201).json({ user, token });

} catch (err) { res.status(500).json({ message: 'Server error' }); } };

exports.login = async (req, res) => { const { email, password } = req.body; try { const user = await User.findOne({ email }); if (!user) return res.status(404).json({ message: 'User not found' });

const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
res.status(200).json({ user, token });

} catch (err) { res.status(500).json({ message: 'Server error' }); } };

// File: backend/controllers/businessController.js

const Business = require('../models/Business');

exports.registerBusiness = async (req, res) => { const { ein, businessName, bankAccountNumber, controlNumber, fedTaxId, stateTaxId } = req.body; try { const exists = await Business.findOne({ ein }); if (exists) return res.status(400).json({ message: 'Business already registered' });

const business = await Business.create({ ein, businessName, bankAccountNumber, controlNumber, fedTaxId, stateTaxId });
res.status(201).json(business);

} catch (err) { res.status(500).json({ message: 'Server error' }); } };

exports.getBusiness = async (req, res) => { try { const business = await Business.findById(req.params.id); if (!business) return res.status(404).json({ message: 'Business not found' }); res.status(200).json(business); } catch (err) { res.status(500).json({ message: 'Server error' }); } };

// File: backend/controllers/payrollController.js

const Payroll = require('../models/Payroll');

exports.issuePayroll = async (req, res) => { const { employeeName, payPeriod, grossPay, netPay, taxes, businessId } = req.body; try { const payroll = await Payroll.create({ employeeName, payPeriod, grossPay, netPay, taxes, businessId }); res.status(201).json(payroll); } catch (err) { res.status(500).json({ message: 'Server error' }); } };

exports.getPayrolls = async (req, res) => { try { const payrolls = await Payroll.find({ businessId: req.params.businessId }); res.status(200).json(payrolls); } catch (err) { res.status(500).json({ message: 'Server error' }); } };

exports.downloadPaystub = async (req, res) => { try { const payroll = await Payroll.findById(req.params.id); if (!payroll) return res.status(404).json({ message: 'Paystub not found' }); // Placeholder: Add PDF generation logic here res.status(200).json(payroll); } catch (err) { res.status(500).json({ message: 'Server error' }); } };

                                               
