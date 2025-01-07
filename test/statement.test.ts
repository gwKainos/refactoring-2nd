import { statement } from '../src/statement';
import plays from '../src/plays.json';
import invoices from '../src/invoices.json';

describe('Index function', () => {
  test('should generate correct invoice for BigCo', () => {
    const expectedOutput = `청구내역 (고객명: BigCo)
hamlet: $650.00 (55석)
As You Like It: $580.00 (35석)
Othello: $500.00 (40석)
총액: $1,730.00
적립 포인트: 47점
`;

    const result = statement(invoices[0], plays);  // 두 개의 인자 전달
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

    expect(() => statement(faultyInvoice, faultyPlays)).toThrow(
        '알 수 없는 장르: mystery'
    );
  });
});
