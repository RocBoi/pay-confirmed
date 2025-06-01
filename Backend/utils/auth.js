// utils/auth.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';
const JWT_EXPIRES_IN = '1h'; // Default expiration time

/**
 * Generate a JWT for a user payload.
 * @param {Object} payload - Data to encode into the token (e.g. userId, role)
 * @returns {string} JWT token
 */
function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

/**
 * Verify a JWT token's validity and return the decoded data.
 * @param {string} token - JWT token
 * @returns {Object|null} Decoded payload or null if invalid
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

/**
 * Decode a JWT without verifying (useful for debugging)
 * @param {string} token - JWT token
 * @returns {Object} Decoded payload
 */
function decodeToken(token) {
  return jwt.decode(token);
}

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
};
