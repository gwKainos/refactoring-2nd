import { expect } from 'chai';
import { station, readingsOutsideRange } from '../../src/chapter06/refactoring08.js';

describe('readingsOutsideRange Tests', () => {
  it('should return readings outside the range', () => {
    const min = 50;
    const max = 58;
    const alerts = readingsOutsideRange(station, min, max);

    expect(alerts).to.have.lengthOf(1); // 47만 범위 밖에 있음
    expect(alerts).to.deep.include({ temp: 47, time: '2016-11-10 09:10' });
  });

  it('should return an empty array when all readings are within the range', () => {
    const min = 40;
    const max = 60;
    const alerts = readingsOutsideRange(station, min, max);

    expect(alerts).to.be.an('array').that.is.empty; // 모든 값이 범위 내
  });

  it('should return all readings when no readings are within the range', () => {
    const min = 60;
    const max = 70;
    const alerts = readingsOutsideRange(station, min, max);

    expect(alerts).to.have.lengthOf(5); // 모든 값이 범위 밖
    expect(alerts).to.deep.include.members(station.readings);
  });

  it('should handle an empty readings array', () => {
    const emptyStation = { name: 'ZB1', readings: [] };
    const min = 50;
    const max = 58;
    const alerts = readingsOutsideRange(emptyStation, min, max);

    expect(alerts).to.be.an('array').that.is.empty; // 빈 배열 반환
  });
});
