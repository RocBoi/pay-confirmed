// tests/validator.test.js
const { isValidEIN, isValidTaxId } = require('../utils/validator');

describe('EIN and Tax ID validation', () => {
  it('validates correct EIN format', () => {
    expect(isValidEIN('12-3456789')).toBe(true);
  });

  it('rejects incorrect EIN format', () => {
    expect(isValidEIN('123-45-6789')).toBe(false);
  });

  it('validates 9-digit Tax ID', () => {
    expect(isValidTaxId('123456789')).toBe(true);
  });

  it('rejects invalid Tax ID', () => {
    expect(isValidTaxId('123-45-6789')).toBe(false);
  });
});
