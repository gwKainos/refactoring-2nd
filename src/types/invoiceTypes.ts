import { Play } from "./playTypes";

export type Performance = {
  playID: string;
  audience: number;
};

export type Invoice = {
  customer: string;
  performances: Performance[];
};

export type EnrichedPerformance = Performance & {
  play: Play;
};

export type StatementData = {
  customer: string;
  performances: EnrichedPerformance[];
};
