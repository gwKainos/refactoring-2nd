import { expect } from "chai";
import { describe, it } from "mocha";
import { Book } from "../src/Book.js";

describe("Book", () => {
  it("adds a reservation successfully", () => {
    const book = new Book();
    const customer = { id: 1, name: "Alice" };

    book.addReservation(customer, "Business trip");

    const reservations = book.getReservations();
    expect(reservations).to.have.lengthOf(1);
    expect(reservations[0]).to.deep.equal({
      customer,
      reason: "Business trip",
    });
  });

  it("prevents duplicate reservations for the same customer", () => {
    const book = new Book();
    const customer = { id: 1, name: "Alice" };

    book.addReservation(customer, "Business trip");
    book.addReservation(customer, "Another reason");

    const reservations = book.getReservations();
    expect(reservations).to.have.lengthOf(1); // 중복 방지
    expect(reservations[0]).to.deep.equal({
      customer,
      reason: "Business trip",
    });
  });

  it("allows reservations for different customers", () => {
    const book = new Book();
    const customer1 = { id: 1, name: "Alice" };
    const customer2 = { id: 2, name: "Bob" };

    book.addReservation(customer1, "Business trip");
    book.addReservation(customer2, "Vacation");

    const reservations = book.getReservations();
    expect(reservations).to.have.lengthOf(2);
    expect(reservations[0]).to.deep.equal({
      customer: customer1,
      reason: "Business trip",
    });
    expect(reservations[1]).to.deep.equal({
      customer: customer2,
      reason: "Vacation",
    });
  });

  it("returns a shallow copy of reservations", () => {
    const book = new Book();
    const customer = { id: 1, name: "Alice" };

    book.addReservation(customer, "Business trip");

    const reservations = book.getReservations();
    expect(reservations).to.not.equal(book._reservations); // 방어적 복사 확인
    expect(reservations).to.deep.equal(book._reservations); // 내용 동일성 확인
  });

  it("handles an empty reservations list", () => {
    const book = new Book();
    const reservations = book.getReservations();

    expect(reservations).to.have.lengthOf(0); // 초기 상태 확인
    expect(reservations).to.be.an("array");
  });
});
