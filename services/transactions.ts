import { TransactionSummary } from "../utils/types.ts";
import { db } from "./db.ts";

export function getTransactionsSummary(
  options: { filter?: string; limit?: number } = {
    filter: "1=1",
    limit: 100,
  },
) {
  return db.prepare(
    `
SELECT
	t.id,
	t.currency,
	t.credit_account_bank,
	t.debit_account_bank,
	t.amount,
	t.date,
	CASE 
		WHEN t.debit_account_bank IN ('FRESH') THEN internal_debit_accounts.number ELSE external_debit_accounts.number
	END as debit_account_number,
  CASE
		WHEN t.debit_account_bank IN ('FRESH') THEN internal_debit_accounts.id ELSE NULL
	END as debit_account_id,
    CASE 
		WHEN t.debit_account_bank IN ('FRESH') THEN internal_debit_accounts.company ELSE NULL
	END as debit_account_company,
    CASE 
		WHEN t.credit_account_bank IN ('FRESH') THEN internal_credit_accounts.company ELSE NULL
	END as credit_account_company,
    CASE 
		WHEN t.credit_account_bank IN ('FRESH') THEN internal_credit_accounts.id ELSE external_credit_accounts.id
	END as credit_account_id,
    CASE 
		WHEN t.credit_account_bank IN ('FRESH') THEN internal_credit_accounts.number ELSE external_credit_accounts.number
	END as credit_account_number

FROM
	transactions AS t
	LEFT JOIN accounts AS internal_debit_accounts ON t.debit_account_id = internal_debit_accounts.id
	LEFT JOIN external_accounts AS external_debit_accounts ON t.debit_account_id = external_debit_accounts.id
	LEFT JOIN accounts AS internal_credit_accounts ON t.credit_account_id = internal_credit_accounts.id
	LEFT JOIN external_accounts AS external_credit_accounts ON t.credit_account_id = external_credit_accounts.id
WHERE
  ${options.filter}
  ORDER BY 
	t."date" DESC
LIMIT
  ${options.limit ?? 100}`,
  ).all() as unknown as TransactionSummary[];
}

export function createTransaction({
  amount,
  hash,
  currency,
  date = new Date().toISOString(),
  debit_account_id,
  credit_account_id,
  debit_account_bank,
  credit_account_bank,
}: {
  amount: string;
  hash: string;
  currency: "USD" | "EUR";
  date?: string;
  debit_account_id: number;
  credit_account_id: number;
  debit_account_bank: "FRESH" | "other";
  credit_account_bank: "FRESH" | "other";
}) {
  return db.prepare(
    "INSERT INTO transactions (hash, amount, currency, date, debit_account_id, credit_account_id, debit_account_bank, credit_account_bank) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
  ).run(
    hash,
    amount,
    currency,
    date,
    debit_account_id,
    credit_account_id,
    debit_account_bank,
    credit_account_bank,
  );
}
