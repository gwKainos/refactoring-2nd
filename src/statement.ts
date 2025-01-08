import plays from "./plays.json";
import invoices from "./invoices.json";
import { Invoice } from "./types/invoiceTypes";
import { Plays } from "./types/playTypes";
import { createStatementData } from "./createStatementData";

export function statement(invoice: Invoice, plays: Plays): string {
  return createStatementData(invoice, plays);
}

export function start() {
  for (let invoice of invoices) {
    console.log(statement(invoice, plays));
  }
}
