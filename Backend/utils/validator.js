// utils/validator.js

function isValidEIN(ein) {
  return /^\d{2}-\d{7}$/.test(ein);
}

function isValidTaxId(taxId) {
  return /^\d{9}$/.test(taxId);
}

module.exports = { isValidEIN, isValidTaxId };
