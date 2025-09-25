import { Card } from "@/components/card.tsx";
import { db } from "@/services/db.ts";
import { ChevronRight } from "lucide-preact";
import { renderAmountWithoutCurrency } from "../../../utils/formats.ts";

const NumberFormat = Intl.NumberFormat("en-US", {});

export default function DayRecap({ company }: { company: string }) {
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
    <Card className="px-6 pt-6 pb-3 grid grid-cols-2">
      <span class="text-sm block font-medium text-gray-700 pb-4 col-span-2">
        Debits last 24 hours
      </span>
      <a
        href={`/bank/${company}/transactions`}
        class="hover:bg-gray-100 rounded -ml-2 pl-2 -mt-2 pt-2 mr-4 pb-2 group"
      >
        <span class="flex flex-row gap-2 group-hover:gap-4 items-center duration-150">
          Transactions
          <ChevronRight size="12" />
        </span>
        <span class="text-4xl font-semibold">
          {NumberFormat.format(data.count)}
        </span>
      </a>
      <a
        href={`/bank/${company}/transactions`}
        className="hover:bg-gray-100 rounded -ml-2 pl-2 -mt-2 pt-2 pb-2 group"
      >
        <span class="flex flex-row gap-2 group-hover:gap-4 items-center duration-150">
          Volume in USD
          <ChevronRight size="12" />
        </span>
        <span class="text-4xl font-semibold">
          {renderAmountWithoutCurrency(data.sum_amount / 100)}
        </span>
      </a>
    </Card>
  );
}
