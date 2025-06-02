// tests/payroll.test.js
const { calculatePayroll } = require('../services/payrollService');

describe('Payroll Service - calculatePayroll()', () => {
  it('should calculate net pay correctly', () => {
    const input = {
      grossPay: 6000,
      deductions: {
        federal: 900,
        state: 300,
        insurance: 100
      }
    };

    const result = calculatePayroll(input);
    
    expect(result).toHaveProperty('netPay');
    expect(result.netPay).toBe(6000 - (900 + 300 + 100));
  });

  it('should handle zero deductions', () => {
    const input = {
      grossPay: 4000,
      deductions: {
        federal: 0,
        state: 0,
        insurance: 0
      }
    };

    const result = calculatePayroll(input);

    expect(result.netPay).toBe(4000);
  });

  it('throws error if input is missing', () => {
    expect(() => calculatePayroll(null)).toThrow();
  });
});
