import { expect } from "chai";
import { describe, it } from "mocha";
import {inNewEngland} from "../../src/chapter06/refactoring05-02.js";

describe("inNewEngland", () => {
  it("returns true for a customer in New England", () => {
    const customer = { address: { state: "MA" } };
    expect(inNewEngland(customer.address.state)).to.be.true;
  });

  it("returns false for a customer outside New England", () => {
    const customer = { address: { state: "NY" } };
    expect(inNewEngland(customer.address.state)).to.be.false;
  });

  it("returns false for a customer with no state", () => {
    const customer = { address: {} };
    expect(inNewEngland(customer.address.state)).to.be.false;
  });

  it("returns false for a customer with no address", () => {
    const customer = {
      name: 'Paul',
      address: { state: 'AA' },
    };
    expect(inNewEngland(customer.address.state)).to.be.false;
  });
});

describe("New England customers filter", () => {
  it("filters customers correctly", () => {
    const someCustomers = [
      { name: "Alice", address: { state: "MA" } },
      { name: "Bob", address: { state: "NY" } },
      { name: "Charlie", address: { state: "CT" } },
      { name: "Dave", address: { state: "CA" } },
    ];

    const newEnglanders = someCustomers.filter(c => inNewEngland(c.address.state));

    expect(newEnglanders).to.have.lengthOf(2);
    expect(newEnglanders).to.deep.equal([
      { name: "Alice", address: { state: "MA" } },
      { name: "Charlie", address: { state: "CT" } },
    ]);
  });

  it("returns an empty array when no customers are in New England", () => {
    const someCustomers = [
      { name: "Alice", address: { state: "NY" } },
      { name: "Bob", address: { state: "CA" } },
    ];

    const newEnglanders = someCustomers.filter(c => inNewEngland(c.address.state));

    expect(newEnglanders).to.have.lengthOf(0);
    expect(newEnglanders).to.deep.equal([]);
  });

  it("handles an empty customers list", () => {
    const someCustomers = [];
    const newEnglanders = someCustomers.filter(c => inNewEngland(c.address.state));
    expect(newEnglanders).to.have.lengthOf(0);
    expect(newEnglanders).to.deep.equal([]);
  });
});
