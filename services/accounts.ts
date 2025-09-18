import { db } from "./db.ts";

export type getAccount = {
  id: number;
  number: string;
  currency: string;
  balance: number;
  company: string;
  legal_name: string;
  pref_name: string;
  name: string;
  country: string;
}[];

export function getAccounts({ filter }: { filter: string }) {
  return db.prepare(
    `SELECT *, COALESCE(name, legal_name) as pref_name FROM accounts LEFT JOIN companies ON accounts.company = companies.slug WHERE ${filter}`,
  )
    .all() as getAccount;
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
