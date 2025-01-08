import plays from "./plays.json";
import invoices from "./invoices.json";
import { Invoice, Performance } from "./types/invoiceTypes";
import { Play, Plays } from "./types/playTypes";

export function statement(invoice: Invoice, plays: Plays): string {
  const statementData = {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
  }
  return renderPlainText(statementData, plays);

  function enrichPerformance(aPerformance: Performance) {
    const result = Object.assign({}, aPerformance);
    return result
  }

  function renderPlainText(data: any, plays: Plays) {
    let result = `청구내역 (고객명: ${data.customer})\n`;

    for (let perf of data.performances) {
      // 청구 내역을 출력한다.
      result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${
          perf.audience
      }석)\n`;
    }

    result += `총액: ${usd(totalAmount())}\n`;
    result += `적립 포인트: ${totalVolumeCredits()}점\n`;
    return result;
  }

  function amountFor(aPerformance: Performance) {
    let result = 0;

    switch (playFor(aPerformance).type) {
      case "tragedy":   // 비극
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;

      case "comedy":   // 희극
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
    }
    return result;
  }

  function playFor(aPerformance: Performance): Play {
    return plays[aPerformance.playID];
  }

  function usd(aNumber: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100)
  }

  function volumeCreditsFor(aPerformance: Performance): number {
    let result = 0;

    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor(aPerformance).type) {
      result += Math.floor(aPerformance.audience / 5);
    }

    return result;
  }

  function totalVolumeCredits(): number {
    let result = 0;
    for (let perf of invoice.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }

  function totalAmount(): number {
    let result = 0;
    for (let perf of invoice.performances) {
      result += amountFor(perf);
    }
    return result;
  }
}

export function start() {
  for (let invoice of invoices) {
    console.log(statement(invoice, plays));
  }
}
