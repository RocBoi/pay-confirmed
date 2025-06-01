const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

exports.createUser = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await User.create({ name, email, password: hashedPassword });
};

exports.comparePassword = async (plainText, hashed) => {
  return await bcrypt.compare(plainText, hashed);
};
