// utils/taxCalculator.js
function calculateNetPay(grossPay, federalTaxRate = 0.1, stateTaxRate = 0.05) {
  const federalTax = grossPay * federalTaxRate;
  const stateTax = grossPay * stateTaxRate;
  const netPay = grossPay - federalTax - stateTax;
  return {
    grossPay,
    federalTax,
    stateTax,
    netPay,
  };
}

module.exports = { calculateNetPay };
