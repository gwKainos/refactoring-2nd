import plays from "./plays.json";
import { EnrichedPerformance, Invoice, Performance, StatementData } from "./types/invoiceTypes";
import { Play, Plays } from "./types/playTypes";
import { PerformanceCalculator } from "./types/interface";

export function createStatementData(invoice: Invoice, plays: Plays) {
  const statementData = {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
    totalAmount: 0,
    totalVolumeCredits: 0
  }
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData)
  return statementData;
}

class createPerformanceCalculator implements PerformanceCalculator {
  performance: Performance;
  play: Play;

  constructor(aPerformance: Performance, aPlay: Play) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount(): number {
    let result = 0;

    switch (this.play.type) {
      case "tragedy":   // 비극
        result = 40000;
        if (this.performance.audience > 30) {
          result += 1000 * (this.performance.audience - 30);
        }
        break;

      case "comedy":   // 희극
        result = 30000;
        if (this.performance.audience > 20) {
          result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르: ${this.play.type}`);
    }
    return result;
  }
}

function enrichPerformance(aPerformance: Performance): EnrichedPerformance {
  const calculator = new createPerformanceCalculator(aPerformance, playFor(aPerformance))
  const result: any = Object.assign({}, aPerformance);
  result.play = playFor(result);
  result.amount = calculator.amount;
  result.volumeCredits = volumeCreditsFor(result);
  return result;
}

function playFor(aPerformance: Performance): Play {
  // @ts-ignore
  return plays[aPerformance.playID];
}

function volumeCreditsFor(aPerformance: EnrichedPerformance): number {
  let result = 0;

  result += Math.max(aPerformance.audience - 30, 0);
  if ("comedy" === aPerformance.play.type) {
    result += Math.floor(aPerformance.audience / 5);
  }

  return result;
}

function totalVolumeCredits(data: StatementData): number {
  return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
}

function totalAmount(data: StatementData): number {
  return data.performances.reduce((total, p) => total + p.amount, 0);
}
