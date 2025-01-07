import plays from "./plays.json";
import invoices from "./invoices.json";

export default function index({invoice, plays}: { invoice: any, plays: any }) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  function playFor(aPerformance: { audience?: number; playID?: any; }) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance: { audience: number; }) {
    let thisAmount = 0;
    switch (playFor(aPerformance).type) {
      case "tragedy":   // 비극
        thisAmount = 40000;
        if (aPerformance.audience > 30) {
          thisAmount += 1000 * (aPerformance.audience - 30);
        }
        break;

      case "comedy":   // 희극
        thisAmount = 30000;
        if (aPerformance.audience > 20) {
          thisAmount += 10000 + 500 * (aPerformance.audience - 20);
        }
        thisAmount += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
    }
    return thisAmount;
  }

  function volumeCreditsFor(perf: { playID: string; audience: number }) {
    let volumeCredits = 0;

    volumeCredits += Math.max(perf.audience - 30, 0);

    if ("comedy" === playFor(perf).type) {
      volumeCredits += Math.floor(perf.audience / 5);
    }

    return volumeCredits;
  }

  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf);

    // 청구 내역을 출력한다.
    result += `${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${
        perf.audience
    }석)\n`;
    totalAmount += amountFor(perf);
  }

  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}

invoices.map((invoice) => console.log(index({invoice: invoice, plays: plays})));
