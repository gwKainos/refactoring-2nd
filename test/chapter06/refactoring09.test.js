import { expect } from 'chai';
import { acquireReading, baseRate, taxThreshold, calculateBaseCharge } from '../../src/chapter06/refactoring09.js';

describe('Reading Tests', () => {
  it('should correctly acquire a reading', () => {
    const reading = acquireReading();

    expect(reading).to.deep.equal({
      customer: 'ivan',
      quantity: 10,
      month: 5,
      year: 2017,
    });
  });

  it('should calculate baseRate correctly', () => {
    expect(baseRate(5, 2017)).to.equal(0.05);
    expect(baseRate(5, 2018)).to.equal(0.03);
  });

  it('should calculate taxThreshold correctly', () => {
    expect(taxThreshold(2017)).to.equal(5);
    expect(taxThreshold(2018)).to.equal(7);
  });

  it('should calculate baseCharge correctly for a given reading', () => {
    const reading = acquireReading();
    const baseCharge = baseRate(reading.month, reading.year) * reading.quantity;

    expect(baseCharge).to.equal(0.5);
  });

  it('should calculate texableCharge correctly for a given reading', () => {
    const reading = acquireReading();
    const base = baseRate(reading.month, reading.year) * reading.quantity;
    const taxableCharge = Math.max(0, base - taxThreshold(reading.year));

    expect(taxableCharge).to.equal(0); // Math.max(0, 0.5 - 5) = 0
  });

  it('should calculate basicChargeAmount using calculateBaseCharge function', () => {
    const reading = acquireReading();
    const basicChargeAmount = calculateBaseCharge(reading);

    expect(basicChargeAmount).to.equal(0.5);
  });
});
