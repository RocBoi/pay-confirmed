// tests/logger.test.js
const logger = require('../utils/logger');

describe('Logger Utility', () => {
  it('should log an info message without throwing', () => {
    expect(() => logger.info('Info message')).not.toThrow();
  });

  it('should log a warning message without throwing', () => {
    expect(() => logger.warn('Warning message')).not.toThrow();
  });

  it('should log an error message without throwing', () => {
    expect(() => logger.error('Error message')).not.toThrow();
  });
});
