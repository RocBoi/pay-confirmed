const formatCurrency = require('../../utils/formatCurrency');

describe('formatCurrency Utility', () => {
  test('formats number correctly', () => {
    expect(formatCurrency(5000)).toBe('$5000.00');
    expect(formatCurrency(49.9)).toBe('$49.90');
  });
});
