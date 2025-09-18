export type Todo = {
  title: string;
  id: number;
  completed: boolean;
};

export type TransactionSummary = {
  id: number;
  currency: string;
  credit_account_bank: "FRESH" | "other";
  debit_account_bank: "FRESH" | "other";
  amount: string;
  date: string;
  debit_account_number: string;
  debit_account_id: number | null;
  debit_account_company: string | null;
  credit_account_company: string | null;
  credit_account_number: string;
  credit_account_id: number | null;
};

export type Account = {
  id: number;
  number: string;
  currency: string;
  balance: number;
  company: string;
};

export const currencies = [{ name: "USD", digits: 2 }, {
  name: "EUR",
  digits: 2,
}];

export type Currency = (typeof currencies)[number];
