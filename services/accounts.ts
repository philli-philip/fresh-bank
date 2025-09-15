import { Account } from "../utils/types.ts";
import { db } from "./db.ts";

export function getAccounts({ filter }: { filter: string }) {
  return db.prepare(`SELECT * FROM accounts WHERE ${filter}`)
    .all() as Account[];
}

export function getAccount(id: number) {
  return db.prepare("SELECT * FROM accounts WHERE id = ?").get(
    id,
  ) as {
    id: number;
    number: string;
    currency: string;
    balance: number;
  };
}
