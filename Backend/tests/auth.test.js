// tests/auth.test.js
const request = require('supertest');
const app = require('../server'); // Express app
const db = require('../config/db'); // PostgreSQL DB connection

describe('Auth Endpoints (PostgreSQL)', () => {
  let testEmail = 'testuser@example.com';
  let testPassword = 'SecurePass123';

  beforeAll(async () => {
    // Clean up if user already exists
    await db.query('DELETE FROM users WHERE email = $1', [testEmail]);
  });

  afterAll(async () => {
    // Clean up after tests
    await db.query('DELETE FROM users WHERE email = $1', [testEmail]);
    await db.end();
  });

  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: testEmail,
      password: testPassword,
      full_name: 'Test User',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.email).toBe(testEmail);
  });

  it('should log in the registered user', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testEmail,
      password: testPassword,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe(testEmail);
  });

  it('should reject login with wrong password', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testEmail,
      password: 'WrongPass',
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message');
  });
});
