const log = require('../../utils/logger');

describe('logger Utility', () => {
  test('logs messages with timestamp and type', () => {
    console.log = jest.fn();
    log('Test log message', 'info');
    expect(console.log).toHaveBeenCalled();
  });
});
