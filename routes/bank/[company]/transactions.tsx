import { Card } from "@/components/card.tsx";
import Message from "@/components/message.tsx";
import { getTransactionsSummary } from "@/services/transactions.ts";
import { TransactionList } from "@/components/bank/transactionList.tsx";
import { Context } from "fresh";
import { State } from "@/utils/utils.ts";

export default function Transactions(ctx: Context<State>) {
  const company = ctx.params.company;
  console.log("Company: ", company);
  const transactions = getTransactionsSummary({
    filter: company !== "all"
      ? `internal_debit_accounts.company = '${company}'`
      : "1=1",
  });
  return (
    <>
      <h1 class="font-bold pb-2">All transactions</h1>
      {transactions.length === 0
        ? (
          <Card className="p-16">
            <Message
              title="No transactions"
              subline="Add a transaction to get started"
            />
          </Card>
        )
        : <TransactionList transactions={transactions} />}
    </>
  );
}
