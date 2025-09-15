import { Account } from "../../utils/types.ts";
import { Card } from "../card.tsx";
import Message from "../message.tsx";

export function AccountList({ accounts }: { accounts: Account[] }) {
  if (accounts.length === 0) {
    return <Message title="No accounts found" />;
  }
  return (
    <Card>
      {accounts.map((account) => (
        <a
          href={`/bank/${account.company}/accounts/${account.id}`}
          key={account.id}
          class="flex justify-between items-center flex-row p-3 not-last:border-b border-gray-200 hover:bg-gray-50"
        >
          <span>{account.number}</span>
          <span>{account.currency}</span>
          <span>{account.balance}</span>
          <span>{account.type}</span>
        </a>
      ))}
    </Card>
  );
}
