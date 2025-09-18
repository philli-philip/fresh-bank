import { Card } from "@/components/card.tsx";
import { db } from "@/services/db.ts";

const amountFormat = Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 3,
  maximumSignificantDigits: 6,
});

const NumberFormat = Intl.NumberFormat("en-US", {});

export default function DayRecap({ company }: { company: string }) {
  console.log(company);
  const data = db.prepare(`
    SELECT
	COUNT(*) as count,
	SUM(amount) as sum_amount
FROM
	transactions AS t
	LEFT JOIN accounts AS internal_debit_accounts ON t.debit_account_id = internal_debit_accounts.id
	LEFT JOIN external_accounts AS external_debit_accounts ON t.debit_account_id = external_debit_accounts.id
WHERE
    strftime('%s',date) >= strftime('%s', 'now', '-1 day')
    ${company !== "all" ? `AND company IS '${company}'` : ""}
`).get() as {
    count: number;
    sum_amount: number;
  };
  return (
    <Card className="px-6 pt-6 pb-6 grid grid-cols-2">
      <span class="text-sm block font-medium text-gray-700 pb-6 col-span-2">
        Debits last 24 hours
      </span>
      <a
        href={`/bank/${company}/transactions`}
        className="hover:bg-gray-100 rounded p-1 pr-2 mr-2 -ml-1 -mt-1"
      >
        <span className="block">
          Transactions
        </span>
        <span class="text-4xl font-semibold">
          {NumberFormat.format(data.count)}
        </span>
      </a>
      <a
        href={`/bank/${company}/transactions`}
        className="hover:bg-gray-100 rounded p-1 -ml-1 -mt-1"
      >
        <span className="block">Volume in USD</span>
        <span class="text-4xl font-semibold">
          {amountFormat.format(data.sum_amount / 100)}
        </span>
      </a>
    </Card>
  );
}
