import plays from "./plays.json";
import invoices from "./invoices.json";

export default function index({invoice, plays}: { invoice: any, plays: any }) {
  function usd(aNumber: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

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

  function totalVolumeCredits() {
    let volumeCredits = 0;
    for (let perf of invoice.performances) {
      volumeCredits += volumeCreditsFor(perf);
    }
    return volumeCredits;
  }

  function totalAmount() {
    let totalAmount = 0;
    for (let perf of invoice.performances) {
      totalAmount += amountFor(perf);
    }
    return totalAmount;
  }

  let result = `청구내역 (고객명: ${invoice.customer})\n`;
  for (let perf of invoice.performances) {
    // 청구 내역을 출력한다.
    result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${
        perf.audience
    }석)\n`;
  }

  result += `총액: ${usd(totalAmount())}\n`;
  result += `적립 포인트: ${totalVolumeCredits()}점\n`;
  return result;
}

invoices.map((invoice) => console.log(index({invoice: invoice, plays: plays})));
