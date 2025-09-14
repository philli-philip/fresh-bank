import { TransactionList } from "../../components/bank/transactionList.tsx";
import { Card } from "../../components/card.tsx";
import Message from "../../components/message.tsx";
import { getTransactionsSummary } from "../../services/transactions.ts";

export default function Transactions() {
  const transactions = getTransactionsSummary();
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
