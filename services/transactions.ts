import { TransactionSummary } from "../utils/types.ts";
import { db } from "./db.ts";

export function getTransactionsSummary(limit?: number) {
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
		WHEN t.debit_account_bank IN ('FRESH') THEN internal_debit_accounts.id ELSE external_debit_accounts.id
	END as debit_account_id,
	CASE
		WHEN t.credit_account_bank IN ('FRESH') THEN internal_credit_accounts.number ELSE external_credit_accounts.number
	END as credit_account_number,
  	CASE
		WHEN t.credit_account_bank IN ('FRESH') THEN internal_credit_accounts.id ELSE external_credit_accounts.id
	END as credit_account_id

FROM
	transactions AS t
	LEFT JOIN accounts AS internal_debit_accounts ON t.debit_account_id = internal_debit_accounts.id
	LEFT JOIN external_accounts AS external_debit_accounts ON t.debit_account_id = external_debit_accounts.id
	LEFT JOIN accounts AS internal_credit_accounts ON t.credit_account_id = internal_credit_accounts.id
	LEFT JOIN external_accounts AS external_credit_accounts ON t.credit_account_id = external_credit_accounts.id
ORDER BY 
	t."date" DESC
LIMIT
  ${limit ?? 100}`,
  ).all() as unknown as TransactionSummary[];
}

export function createTransaction({
  amount,
  currency,
  date = new Date().toISOString(),
  debit_account_id,
  credit_account_id,
  debit_account_bank,
  credit_account_bank,
}: {
  amount: string;
  currency: "USD" | "EUR";
  date?: string;
  debit_account_id: number;
  credit_account_id: number;
  debit_account_bank: "FRESH" | "other";
  credit_account_bank: "FRESH" | "other";
}) {
  return db.prepare(
    "INSERT INTO transactions (amount, currency, date, debit_account_id, credit_account_id, debit_account_bank, credit_account_bank) VALUES (?, ?, ?, ?, ?, ?, ?)",
  ).run(
    amount,
    currency,
    date,
    debit_account_id,
    credit_account_id,
    debit_account_bank,
    credit_account_bank,
  );
}
