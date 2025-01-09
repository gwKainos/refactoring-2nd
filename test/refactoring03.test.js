import { expect } from "chai";
import { describe, it } from "mocha";
import { price } from "../src/refactoring03.js";

// 공통 테스트 데이터
const testCases = [
  {
    description: "calculates the price with additional cost for small quantity",
    input: { itemPrice: 60, quantity: 3 },
    expected: 198, // 180 (base) + 18 (additional cost)
  },
  {
    description: "calculates the price with additional cost for moderate quantity",
    input: { itemPrice: 8000, quantity: 2 },
    expected: 16100, // 16000 (base) + 100 (additional cost)
  },
  {
    description: "calculates the correct price when quantity is less than or equal to 500",
    input: { itemPrice: 10, quantity: 500 },
    expected: 5100, // 5000 (base) + 100 (additional cost)
  },
  {
    description: "calculates the correct price when quantity exceeds 500",
    input: { itemPrice: 10, quantity: 600 },
    expected: 6050, // 6000 (base) - 50 (discount) + 100 (additional cost)
  },
  {
    description: "applies the maximum discount of 100",
    input: { itemPrice: 10, quantity: 2000 },
    expected: 19350, // 20000 (base) - 750 (discount) + 100 (additional cost)
  },
];

// 테스트 코드
describe("price", () => {
  testCases.forEach(({ description, input, expected }) => {
    it(description, () => {
      const result = price(input);
      expect(result).to.equal(expected);
    });
  });
});
