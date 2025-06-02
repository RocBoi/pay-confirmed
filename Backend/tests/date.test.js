// tests/date.test.js
const { formatDate } = require('../utils/date');

describe('formatDate utility', () => {
  it('formats date correctly', () => {
    const input = new Date('2025-06-02T14:00:00Z');
    const result = formatDate(input);
    expect(result).toBe('2025-06-02');
  });

  it('handles string input', () => {
    const result = formatDate('2025-06-02T10:30:00Z');
    expect(result).toBe('2025-06-02');
  });

  it('handles invalid date', () => {
    expect(() => formatDate('invalid-date')).toThrow();
  });
});
