import { ChevronRight } from "lucide-preact";
import { Card } from "../card.tsx";
import Message from "../message.tsx";
import { getAccount } from "../../services/accounts.ts";
import { countryFlags } from "@/data/countries.ts";

const amountFormat = Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
});

export function AccountList({ accounts }: { accounts: getAccount }) {
  if (accounts.length === 0) {
    return <Message title="No accounts found" />;
  }
  return (
    <Card className="overflow-hidden">
      {accounts.map((account) => (
        <div class="relative isolate items-center gap-4 flex flex-row p-3 hover:bg-gray-50 duration-75 not-last:border-b border-gray-200">
          <a
            href={`/bank/${account.company}/accounts/${account.id}`}
            key={account.id}
            class="absolute inset-0 "
          />
          <span class="flex-1">{account.number}</span>
          <span class="flex-1">{account.pref_name}</span>
          <span class="flex-1">
            {countryFlags[
              account.country.toLocaleLowerCase() as keyof typeof countryFlags
            ].emoji}{"  "}{countryFlags[
              account.country.toLocaleLowerCase() as keyof typeof countryFlags
            ].name}
          </span>
          <span class="place-self-end flex-1 text-right gap-2 flex flex-row items-baseline justify-end">
            <span class="text-gray-600">{account.currency}</span>
            <span>{amountFormat.format(account.balance)}</span>
          </span>
          <span class="flex-0">
            <ChevronRight size="20" />
          </span>
        </div>
      ))}
    </Card>
  );
}
