const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('Payroll Routes', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('Issue a payroll', async () => {
    const res = await request(app).post('/api/payroll/issue').send({
      employeeName: 'Test Employee',
      businessId: '60c72b2f9f1b2c001c8d2b13',
      payPeriod: 'June 2025',
      grossPay: 3000,
      taxes: 600,
      netPay: 2400,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.employeeName).toBe('Test Employee');
  });
});
