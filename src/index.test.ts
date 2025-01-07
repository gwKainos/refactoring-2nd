import index from './index';
import plays from './plays.json';
import invoices from './invoices.json';

describe('Index function', () => {
  test('should generate correct invoice for BigCo', () => {
    const expectedOutput = `청구내역 (고객명: BigCo)
hamlet: $650.00 (55석)
As You Like It: $580.00 (35석)
Othello: $500.00 (40석)
총액: $1,730.00
적립 포인트: 47점
`;

    const result = index({ invoice: invoices[0], plays });
    expect(result).toBe(expectedOutput);
  });

  test('should throw error for unknown play type', () => {
    const faultyPlays = {
      ...plays,
      'unknown-play': {
        name: 'Unknown Play',
        type: 'mystery'
      }
    };
    const faultyInvoice = {
      customer: 'FaultyCo',
      performances: [
        {
          playID: 'unknown-play',
          audience: 40
        }
      ]
    };

    expect(() => index({ invoice: faultyInvoice, plays: faultyPlays })).toThrow(
        '알 수 없는 장르: mystery'
    );
  });
});
