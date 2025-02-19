import _ from "lodash";

function acquireReading() {
  return {
    customer: 'ivan',
    quantity: 10,
    month: 5,
    year: 2017,
  };
}

function enrichReading(original) {
  const result = _.cloneDeep(original);
  result.baseCharge = calculateBaseCharge(result)
  result.texableCharge = Math.max(0, result.baseCharge - taxThreshold(result.year));
  return result;
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
  const rawReading = acquireReading();
  const aReading = enrichReading(rawReading);
  return aReading.baseCharge;
}


// 클라이언트 2
const client2 = () => {
  const rawReading = acquireReading();
  const aReading = enrichReading(rawReading);
  return aReading.texableCharge;
}

// 클라이언트 3
const client3 = () => {
  const rawReading = acquireReading();
  const aReading = enrichReading(rawReading);
  return aReading.baseCharge;
}

function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}

[client1, client2, client3].forEach(c => console.info(c()));

export {acquireReading, baseRate, taxThreshold};
