function acquireReading() {
  return {
    customer: 'ivan',
    quantity: 10,
    month: 5,
    year: 2017,
  };
}

class Reading {
  constructor(data) {
    this._customer = data.customer
    this._quantity = data.quantity
    this._month = data.month
    this._year = data.year
  }
  get customer() {
    return this._customer
  }
  get quantity() {
    return this._quantity
  }
  get month() {
    return this._month
  }
  get year() {
    return this._year
  }
}

function baseRate(month, year) {
  if (year === 2017) {
    return 0.05;
  }
  return 0.03;
}

function taxThreshold(year) {
  if (year === 2017) {
    return 5;
  }
  return 7;
}

const aReading = acquireReading();

// 클라이언트 1
const baseCharge = (baseRate(aReading.month, aReading.year) * aReading.quantity);

// 클라이언트 2
const base = (baseRate(aReading.month, aReading.year) * aReading.quantity);
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));

// 클라이언트 3
const basicChargeAmount = calculateBaseCharge(aReading);
function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}

console.info("baseCharge" + baseCharge);
console.info("taxableCharge" + taxableCharge);
console.info("basicChargeAmount" + basicChargeAmount);

export {acquireReading, baseRate, taxThreshold, calculateBaseCharge};
