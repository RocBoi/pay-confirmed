const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('Auth Routes', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  let token;

  test('Register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'John Tester',
      email: 'testuser@example.com',
      password: 'securePass123',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  test('Login user', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'testuser@example.com',
      password: 'securePass123',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
