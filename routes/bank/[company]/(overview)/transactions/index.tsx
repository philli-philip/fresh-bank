import { Card } from "@/components/card.tsx";
import Message from "@/components/message.tsx";
import { getTransactionsSummary } from "@/services/transactions.ts";
import { TransactionList } from "@/components/bank/transactionList.tsx";
import { Context } from "fresh";
import { State } from "@/utils/utils.ts";
import { LinkButton } from "@/components/Button.tsx";
import { Plus } from "lucide-preact";
import { PageHeader } from "../../../../../components/bank/pageHeader.tsx";

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
      <PageHeader title="All transactions" pageTitle="All transactions">
        <LinkButton href="/bank/all/newPayment">
          <Plus size="16" />
          New payment
        </LinkButton>
      </PageHeader>
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
