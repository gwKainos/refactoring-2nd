import plays from "./plays.json";
import { EnrichedPerformance, Invoice, Performance, StatementData } from "./types/invoiceTypes";
import { Play, Plays } from "./types/playTypes";
import { IPerformanceCalculator } from "./types/interface";

class TragedyCalculator {
  constructor(aPerformance: Performance, aPlay: Play) {
    
  }

}

class ComedyCalculator {
  constructor(aPerformance: Performance, aPlay: Play) {
    
  }

}

const createPerformanceCalculator = (aPerformance: Performance, aPlay: Play) => {
  switch (aPlay.type) {
    case 'tragedy':
      return new TragedyCalculator(aPerformance, aPlay)
    case 'comedy':
      return new ComedyCalculator(aPerformance, aPlay)
    default:
      return new PerformanceCalculator(aPerformance, aPlay)
  }
}

class PerformanceCalculator implements IPerformanceCalculator {
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

  get volumeCredits(): number {
    let result = 0;

    result += Math.max(this.performance.audience - 30, 0);
    if ("comedy" === this.play.type) {
      result += Math.floor(this.performance.audience / 5);
    }

    return result;
  }
}

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

function enrichPerformance(aPerformance: Performance): EnrichedPerformance {
  const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance))
  const result: any = Object.assign({}, aPerformance);
  result.play = playFor(result);
  result.amount = calculator.amount;
  result.volumeCredits = calculator.volumeCredits;
  return result;
}

function playFor(aPerformance: Performance): Play {
  // @ts-ignore
  return plays[aPerformance.playID];
}

function totalVolumeCredits(data: StatementData): number {
  return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
}

function totalAmount(data: StatementData): number {
  return data.performances.reduce((total, p) => total + p.amount, 0);
}
