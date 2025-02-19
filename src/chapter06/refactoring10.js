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

// 클라이언트 1
const client1 = () => {
  const aReading = acquireReading();
  const baseCharge = (baseRate(aReading.month, aReading.year) * aReading.quantity);
  return baseCharge;
}


// 클라이언트 2
const client2 = () => {
  const aReading = acquireReading();
  const base = (baseRate(aReading.month, aReading.year) * aReading.quantity);
  const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));
  return taxableCharge;
}


// 클라이언트 3
const client3 = () => {
  const aReading = acquireReading();
  const basicChargeAmount = calculateBaseCharge(aReading);

  return basicChargeAmount;
}

function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}

export {acquireReading, baseRate, taxThreshold};
