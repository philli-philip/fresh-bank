import { MoveLeft, MoveRight } from "npm:lucide-preact";
import { sinceDate } from "../../utils/temporal.ts";
import { TransactionSummary } from "../../utils/types.ts";
import { cn } from "../../utils/utils.ts";

const formatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
});

export function TransactionList(
  { transactions }: { transactions: TransactionSummary[] },
) {
  return (
    <ul class="divide-y divide-gray-200 border border-gray-200 rounded bg-white">
      {transactions.map((transaction) => (
        <Transaction transaction={transaction} key={transaction.id} />
      ))}
    </ul>
  );
}

const Transaction = ({ transaction }: { transaction: TransactionSummary }) => (
  <li class="p-2 hover:bg-gray-100 duration-75 justify-between items-center flex flex-row">
    <span class="pl-4 gap-2 flex flex-row items-center">
      {transaction.credit_account_bank === "FRESH"
        ? (
          <>
            <MoveLeft size={12} /> Credit
          </>
        )
        : (
          <>
            <MoveRight size={12} /> Debit
          </>
        )}
    </span>
    <span>
      To:{transaction.debit_account_bank === "FRESH"
        ? (
          <a
            href={`/bank/account/${transaction.debit_account_id}`}
            class="text-blue-700"
          >
            {transaction.debit_account_number}
          </a>
        )
        : <span>{transaction.debit_account_number}</span>}
    </span>
    <span class="text-right">
      <span
        class={cn(
          "text-right px-1 py-0.5 rounded",
          transaction.credit_account_bank === "FRESH"
            ? "text-green-700 bg-green-50 before:content-['+_']"
            : "text-red-700 bg-red-50 before:content-['-_']",
        )}
      >
        {formatter.format(parseInt(transaction.amount) / 100)}
      </span>
    </span>
    <span>
      To:{transaction.credit_account_bank === "FRESH"
        ? (
          <a
            href={`/bank/account/${transaction.credit_account_id}`}
            class="text-blue-700"
          >
            {transaction.credit_account_number}
          </a>
        )
        : <span>{transaction.credit_account_number}</span>}
    </span>
    <span class="text-right">
      {sinceDate(transaction.date, dateFormatter)}
    </span>
  </li>
);
