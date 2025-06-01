const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('Business Routes', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('Register a new business', async () => {
    const res = await request(app).post('/api/business/register').send({
      name: 'Test Business LLC',
      ein: '12-3456789',
      fedTaxId: '99-9999999',
      stateTaxId: 'GA-12345678',
      controlNumber: 'CN-56789',
      businessBankAccount: '9876543210',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Test Business LLC');
  });
});
