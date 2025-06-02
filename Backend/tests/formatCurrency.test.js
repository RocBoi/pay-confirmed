// tests/currency.test.js

const { formatCurrency } = require('../utils/currency');

describe('formatCurrency utility', () => {
  it('formats USD correctly (default)', () => {
    const result = formatCurrency(1234.56);
    expect(result).toBe('$1,234.56');
  });

  it('formats EUR correctly', () => {
    const result = formatCurrency(1234.56, 'EUR', 'de-DE');
    expect(result).toBe('1.234,56 €');
  });

  it('formats JPY correctly (no decimals)', () => {
    const result = formatCurrency(1234, 'JPY', 'ja-JP');
    expect(result).toBe('￥1,234');
  });

  it('handles zero correctly', () => {
    const result = formatCurrency(0);
    expect(result).toBe('$0.00');
  });

  it('handles negative numbers', () => {
    const result = formatCurrency(-45.67);
    expect(result).toBe('-$45.67');
  });
});
