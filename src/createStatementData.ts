import plays from "./plays.json";
import { EnrichedPerformance, Invoice, Performance, StatementData } from "./types/invoiceTypes";
import { Play, Plays } from "./types/playTypes";
import { IPerformanceCalculator } from "./types/interface";

class PerformanceCalculator implements IPerformanceCalculator {
  performance: Performance;
  play: Play;

  constructor(aPerformance: Performance, aPlay: Play) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount(): number {
    throw new Error('서브 클래스에서 처리하도록 설계되었습니다.')
  }

  get volumeCredits(): number {
    return Math.max(this.performance.audience - 30, 0);
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000
    if (this.performance.audience > 30) result += 1000 * (this.performance.audience - 30)
    return result
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5)
  }
  get amount() {
    let result = 30000
    if (this.performance.audience > 20) result += 10000 + 500 * (this.performance.audience - 20)
    result += 300 * this.performance.audience
    return result
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
