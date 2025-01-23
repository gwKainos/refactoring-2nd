import assert from "assert";

class Book {
  constructor() {
    this._reservations = [];
  }

  addReservation(customer, isPriority) {
    assert(isPriority === true || isPriority === false);
    this._reservations.push({customer});
  }

  _isDuplicateReservation(customer) {
    return this._reservations.some(res => res.customer.id === customer.id);
  }

  getReservations() {
    return this._reservations.slice(); // 얕은 복사로 반환
  }
}

export { Book };
