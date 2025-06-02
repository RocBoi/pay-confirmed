// tests/business.test.js
const request = require('supertest');
const app = require('../server'); // Express app
const db = require('../config/db'); // PostgreSQL DB connection

describe('Business Endpoints (PostgreSQL)', () => {
  let token;
  let businessId;
  const testBusiness = {
    name: 'Test Corp',
    ein: '12-3456789',
    fed_tax_id: '98-7654321',
    state_tax_id: 'GA-998877',
    control_number: 'CTRL-123456',
    banking_account: 'ACCT-987654321',
  };

  const testUser = {
    email: 'bizowner@example.com',
    password: 'SecurePass456',
    full_name: 'Biz Owner',
  };

  beforeAll(async () => {
    // Clean up user and business if exists
    await db.query('DELETE FROM businesses WHERE name = $1', [testBusiness.name]);
    await db.query('DELETE FROM users WHERE email = $1', [testUser.email]);

    // Register user
    const res = await request(app).post('/api/auth/register').send(testUser);
    token = res.body.token;
  });

  afterAll(async () => {
    await db.query('DELETE FROM businesses WHERE name = $1', [testBusiness.name]);
    await db.query('DELETE FROM users WHERE email = $1', [testUser.email]);
    await db.end();
  });

  it('should register a business', async () => {
    const res = await request(app)
      .post('/api/business/register')
      .set('Authorization', `Bearer ${token}`)
      .send(testBusiness);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('business');
    expect(res.body.business.name).toBe(testBusiness.name);

    businessId = res.body.business.id;
  });

  it('should retrieve the registered business by ID', async () => {
    const res = await request(app)
      .get(`/api/business/${businessId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.business.name).toBe(testBusiness.name);
    expect(res.body.business.ein).toBe(testBusiness.ein);
  });

  it('should not register a business without a token', async () => {
    const res = await request(app)
      .post('/api/business/register')
      .send(testBusiness);

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message');
  });
});
