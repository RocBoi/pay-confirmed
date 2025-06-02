const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Your Neon Postgres connection string in .env
  ssl: {
    rejectUnauthorized: false, // Neon requires SSL but without strict cert verification
  },
});

// Simple query wrapper function
const query = (text, params) => pool.query(text, params);

module.exports = {
  query,
  pool,
};
