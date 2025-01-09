import {expect} from "chai";
import {describe, it} from "mocha";
import {reportLines} from "../src/refactoring02-03.js";

// 공통 테스트 데이터
const customerA = {name: '카이노스', location: '서울'};
const customerB = {name: '제이', location: '제주'};
const emptyCustomer = {name: '', location: ''};

describe("reportLines", () => {
  it("returns correct data for customerA", () => {
    const result = reportLines(customerA);

    expect(result).to.deep.equal([
      ['name', '카이노스'],
      ['location', '서울'],
    ]);
  });

  it("returns correct data for customerB", () => {
    const result = reportLines(customerB);

    expect(result).to.deep.equal([
      ['name', '제이'],
      ['location', '제주'],
    ]);
  });

  it("handles empty customer data", () => {
    const result = reportLines(emptyCustomer);

    expect(result).to.deep.equal([
      ['name', ''],
      ['location', ''],
    ]);
  });
});

describe("gatherCustomerData", () => {
  it("adds customerA data to lines array", () => {
    const lines = [];
    lines.push(['name', customerA.name])
    lines.push(['location', customerA.location])

    expect(lines).to.deep.equal([
      ['name', '카이노스'],
      ['location', '서울'],
    ]);
  });

  it("adds customerB data to lines array", () => {
    const lines = [];
    lines.push(['name', customerB.name])
    lines.push(['location', customerB.location])

    expect(lines).to.deep.equal([
      ['name', '제이'],
      ['location', '제주'],
    ]);
  });

  it("handles pre-filled lines with customerA", () => {
    const lines = [['id', '123']];
    lines.push(['name', customerA.name])
    lines.push(['location', customerA.location])

    expect(lines).to.deep.equal([
      ['id', '123'],
      ['name', '카이노스'],
      ['location', '서울'],
    ]);
  });
});
