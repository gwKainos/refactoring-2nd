import {expect} from "chai";
import {describe, it} from "mocha";
import {moreThanFiveLateDeliveries, rating} from "../src/refactoring02-02.js";

// 테스트 코드
describe("rating", () => {
  it("returns 2 if > 5 late deliveries", () => {
    const driver = { numberOfLateDeliveries: 6 };
    const result = rating(driver);
    expect(result).to.equal(2);
  });

  it("returns 1 if <= 5 late deliveries", () => {
    const driver = { numberOfLateDeliveries: 5 };
    const result = rating(driver);
    expect(result).to.equal(1);
  });
});

describe("moreThanFiveLateDeliveries", () => {
  it("returns true if > 5 late deliveries", () => {
    const driver = { numberOfLateDeliveries: 6 };
    const result = moreThanFiveLateDeliveries(driver);
    expect(result).to.be.true;
  });

  it("returns false if <= 5 late deliveries", () => {
    const driver = { numberOfLateDeliveries: 5 };
    const result = moreThanFiveLateDeliveries(driver);
    expect(result).to.be.false;
  });
});
