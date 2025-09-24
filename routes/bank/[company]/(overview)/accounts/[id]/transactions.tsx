import { Head } from "fresh/runtime";
import { Card } from "@/components/card.tsx";
import { TransactionList } from "@/components/bank/transactionList.tsx";
import { extractNavigation } from "@/utils/navigation.ts";
import { Context } from "fresh";
import { State } from "@/utils/utils.ts";
import { getTransactionsSummary } from "@/services/transactions.ts";
import Message from "@/components/message.tsx";
import { PageHeader } from "@/components/bank/pageHeader.tsx";

export default function TransactionsView(ctx: Context<State>) {
  const { item } = extractNavigation(ctx);

  const filter = `debit_account_id IS ${item} OR credit_account_id IS ${item}`;
  const transactions = getTransactionsSummary({
    filter: filter,
  });
  return (
    <>
      <PageHeader title="Transactions" />
      <Card>
        {transactions.length === 0
          ? <Message title="No transactions found" />
          : <TransactionList transactions={transactions} />}
      </Card>
    </>
  );
}
