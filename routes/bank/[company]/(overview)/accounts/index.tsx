import { Head } from "fresh/runtime";
import { getAccounts } from "@/services/accounts.ts";
import { AccountList } from "@/components/bank/accountList.tsx";
import { State } from "@/utils/utils.ts";
import { Context } from "fresh";
import { extractNavigation } from "@/utils/navigation.ts";
import { PageHeader } from "@/components/bank/pageHeader.tsx";

export default function AccountsView(ctx: Context<State>) {
  const { company } = extractNavigation(ctx);
  const filter = company !== "all" ? `accounts.company = '${company}'` : "1=1";
  const accounts = getAccounts({
    filter,
  });
  return (
    <>
      <PageHeader title="Accounts" />
      <AccountList accounts={accounts} />
    </>
  );
}
