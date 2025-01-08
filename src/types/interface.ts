import { Performance } from "./invoiceTypes";
import { Play } from "./playTypes";

export interface PerformanceCalculator {
  performance: Performance;
  play: Play;
}
