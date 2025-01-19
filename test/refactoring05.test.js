import { expect } from "chai";
import { describe, it } from "mocha";
import { Book } from "../src/Book.js";

describe("Book", () => {
  it("adds a reservation successfully", () => {
    const book = new Book();
    const customer = { id: 1, name: "Alice" };

    book.addReservation(customer);

    const reservations = book.getReservations();
    expect(reservations).to.have.lengthOf(1);
    expect(reservations[0]).to.deep.equal({ customer });
  });

  it("allows adding multiple reservations", () => {
    const book = new Book();
    const customer1 = { id: 1, name: "Alice" };
    const customer2 = { id: 2, name: "Bob" };

    book.addReservation(customer1);
    book.addReservation(customer2);

    const reservations = book.getReservations();
    expect(reservations).to.have.lengthOf(2);
    expect(reservations[0]).to.deep.equal({ customer: customer1 });
    expect(reservations[1]).to.deep.equal({ customer: customer2 });
  });

  it("does not prevent duplicate reservations", () => {
    const book = new Book();
    const customer = { id: 1, name: "Alice" };

    book.addReservation(customer);
    book.addReservation(customer); // 중복 예약 허용

    const reservations = book.getReservations();
    expect(reservations).to.have.lengthOf(2); // 중복 추가 확인
    expect(reservations[0]).to.deep.equal({ customer });
    expect(reservations[1]).to.deep.equal({ customer });
  });

  it("returns a shallow copy of reservations", () => {
    const book = new Book();
    const customer = { id: 1, name: "Alice" };

    book.addReservation(customer);

    const reservations = book.getReservations();
    reservations[0].customer.name = "Changed"; // 복사본 변경

    const originalReservations = book.getReservations();
    expect(originalReservations[0].customer.name).to.equal("Changed"); // 얕은 복사 확인
  });

  it("handles an empty reservations list", () => {
    const book = new Book();

    const reservations = book.getReservations();
    expect(reservations).to.be.an("array").that.is.empty; // 초기 상태 확인
  });
});
