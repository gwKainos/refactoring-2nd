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
  let asia;

  beforeEach(function () {
    asia = new Province(sampleProvinceData());
  })

  it("shortfall", () => {
    expect(asia.shortfall).equals(5)
  });

  it("profit", () => {
    expect(asia.profit).equals(230)
  });

  it("change production", () => {
    asia.producers[0].production = 20;
    expect(asia.shortfall).equals(-6)
    expect(asia.profit).equals(292)
  });
});

describe("no producers", function () {
  let noProducers;

  beforeEach(function () {
    const data = {
      name: "No Producers",
      producers: [],
      demand: 30,
      price: 20
    }

    noProducers = new Province(data);
  })

  it("shortfall", () => {
    expect(noProducers.shortfall).equals(30)
  });

  it("profit", () => {
    expect(noProducers.profit).equals(0)
  });
});
