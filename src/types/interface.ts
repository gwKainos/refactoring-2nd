import { Performance } from "./invoiceTypes";
import { Play } from "./playTypes";

export interface IPerformanceCalculator {
  performance: Performance;
  play: Play;
}
