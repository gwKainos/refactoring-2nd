import { expect } from "chai";
import sinon from "sinon";
import printOwing from "../src/refactoring01.js";

function customerData() {
  return {
    customer: '카이노스',
    orders: [
      { name: '강동 대출', amount: 6000 },
      { name: '강서 대출', amount: 9000 },
    ],
  };
}

describe("printOwing", () => {
  it("prints the correct owing information", () => {
    const invoice = customerData();

    // Mock console.log using sinon
    const consoleSpy = sinon.spy(console, "log");

    // Call the function
    printOwing(invoice);

    // Validate the console output
    expect(consoleSpy.calledWith('*****************')).to.be.true;
    expect(consoleSpy.calledWith('**** 고객 채무 ****')).to.be.true;
    expect(consoleSpy.calledWith('*****************')).to.be.true;
    expect(consoleSpy.calledWith(`고객명: ${invoice.customer}`)).to.be.true;
    expect(consoleSpy.calledWith('채무액: 15000')).to.be.true;

    const expectedDueDate = new Date();
    expectedDueDate.setDate(expectedDueDate.getDate() + 30);
    expect(consoleSpy.calledWith(`마감일: ${expectedDueDate.toLocaleDateString()}`)).to.be.true;

    // Restore the original console.log
    consoleSpy.restore();
  });
});
