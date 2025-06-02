// tests/taxCalculator.test.js
const { calculateNetPay } = require('../utils/taxCalculator');

describe('calculateNetPay utility', () => {
  it('calculates net pay correctly', () => {
    const result = calculateNetPay(1000);
    expect(result.netPay).toBeCloseTo(850);
  });

  it('applies custom tax rates', () => {
    const result = calculateNetPay(2000, 0.2, 0.1);
    expect(result.netPay).toBeCloseTo(1400);
  });

  it('handles zero gross pay', () => {
    const result = calculateNetPay(0);
    expect(result.netPay).toBe(0);
  });
});
