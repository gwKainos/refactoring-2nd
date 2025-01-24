function acquireReading() {
  return {
    customer: 'ivan',
    quantity: 10,
    month: 5,
    year: 2017,
  };
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
