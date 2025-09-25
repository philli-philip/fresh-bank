import { MoveLeft, MoveRight } from "npm:lucide-preact";
import { sinceDate } from "../../utils/temporal.ts";
import { TransactionSummary } from "../../utils/types.ts";
import { cn } from "../../utils/utils.ts";
import { renderAmountWithoutCurrency } from "../../utils/formats.ts";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
});

export function TransactionList(
  { transactions }: { transactions: TransactionSummary[] },
) {
  return (
    <ul
      id="transaction-list"
      hx-ext="sse"
      sse-connect="/api/sse"
      sse-swap="message"
      hx-swap="afterbegin"
      class="divide-y divide-gray-200 border border-gray-200 rounded bg-white"
    >
      {transactions.map((transaction) => (
        <Transaction transaction={transaction} key={transaction.id} />
      ))}
    </ul>
  );
}

export const Transaction = (
  { transaction }: { transaction: TransactionSummary },
) => (
  <li class="p-2 isolate duration-75 justify-between items-center flex flex-row relative">
    <a
      href={`/bank/all/transactions/${transaction.id}`}
      class="absolute inset-0 -z-10 hover:bg-gray-100"
    >
    </a>
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
            href={`/bank/${transaction.debit_account_company}/accounts/${transaction.debit_account_id}`}
            class="text-blue-700 px-1 py-0.5 rounded border border-transparent hover:bg-blue-50"
          >
            {transaction.debit_account_number}
          </a>
        )
        : <span class="px-1 py-0.5">{transaction.debit_account_number}</span>}
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
        {renderAmountWithoutCurrency(parseInt(transaction.amount) / 100)}
      </span>
    </span>
    <span>
      To:{transaction.credit_account_bank === "FRESH"
        ? (
          <a
            href={`/bank/${transaction.credit_account_company}/accounts/${transaction.credit_account_id}`}
            class="text-blue-700 px-1 py-0.5 rounded border border-transparent hover:bg-blue-50"
          >
            {transaction.credit_account_number}
          </a>
        )
        : <span class="px-1 py-0.5">{transaction.credit_account_number}</span>}
    </span>
    <span class="text-right">
      {sinceDate(transaction.date, dateFormatter)}
    </span>
  </li>
);
