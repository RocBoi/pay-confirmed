const validateEIN = (ein) => {
  const regex = /^\d{2}-\d{7}$/;
  return regex.test(ein);
};

module.exports = validateEIN;
