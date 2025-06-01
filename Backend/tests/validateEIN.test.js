const validateEIN = require('../../utils/validateEIN');

describe('validateEIN Utility', () => {
  test('returns true for valid EIN', () => {
    expect(validateEIN('12-3456789')).toBe(true);
  });

  test('returns false for invalid EIN', () => {
    expect(validateEIN('123-456789')).toBe(false);
    expect(validateEIN('12-3456')).toBe(false);
  });
});
