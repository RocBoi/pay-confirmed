// services/payrollService.js
function calculatePayroll({ grossPay, deductions }) {
  if (!grossPay || !deductions) throw new Error('Invalid payroll input');
  const totalDeductions = Object.values(deductions).reduce((a, b) => a + b, 0);
  return { netPay: grossPay - totalDeductions };
}

module.exports = { calculatePayroll };
