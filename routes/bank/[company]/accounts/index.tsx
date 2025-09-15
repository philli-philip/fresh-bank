import { Head } from "fresh/runtime";
import { getAccounts } from "@/services/accounts.ts";
import { AccountList } from "@/components/bank/accountList.tsx";
import { State } from "@/utils/utils.ts";
import { Context } from "fresh";

export default function AccountsView(ctx: Context<State>) {
  const company = ctx.params.company;
  const filter = company !== "all" ? `accounts.company = '${company}'` : "1=1";
  const accounts = getAccounts({
    filter,
  });
  return (
    <>
      <Head>
        <title>Accounts</title>
      </Head>
      <h1 class="text-2xl font-bold pb-4">Accounts</h1>
      <AccountList accounts={accounts} />
    </>
  );
}
