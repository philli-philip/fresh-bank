import { Head } from "fresh/runtime";
import { getAccounts } from "../../../services/accounts.ts";
import { AccountList } from "../../../components/bank/accountList.tsx";

export default function AccountsView() {
  const accounts = getAccounts();
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
