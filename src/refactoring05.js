class Book {
  constructor() {
    this._reservations = [];
  }

  addReservation(customer, reason) {
    if (this._isDuplicateReservation(customer)) {
      console.log(`${customer.name} 님은 이미 예약되었습니다.`);
      return;
    }
    this._reservations.push({ customer, reason });
    console.log(`${customer.name} 님의 예약이 추가되었습니다. 이유: ${reason}`);
  }

  _isDuplicateReservation(customer) {
    return this._reservations.some(res => res.customer.id === customer.id);
  }

  getReservations() {
    return this._reservations.slice();
  }
}
