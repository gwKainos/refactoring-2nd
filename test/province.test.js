import { expect } from "chai";
import Province from "../src/province.js";

function sampleProvinceData() {
  return {
    name: "Asia",
    producers: [
      { name: "Byzzantium", cost: 10, production: 9 },
      { name: "Attalia", cost: 12, production: 10 },
      { name: "Sinope", cost: 10, production: 6 },
    ],
    demand: 30,
    price: 20,
  };
}

describe("province", function () {
  it("shortfall", () => {
    const asia = new Province(sampleProvinceData());
    expect(asia.shortfall).equals(5)
  });

  it("profit", () => {
    const asia = new Province(sampleProvinceData());
    expect(asia.profit).equals(230)
  });
});
