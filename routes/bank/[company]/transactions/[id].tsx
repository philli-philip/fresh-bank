import { State } from "@/utils/utils.ts";
import { extractNavigation } from "@/utils/navigation.ts";
import { Context } from "fresh";
import { Card } from "@/components/card.tsx";
import { Head } from "fresh/runtime";

export default function TransactionView(ctx: Context<State>) {
  const { company, item } = extractNavigation(ctx);
  console.log("Company: ", company);
  console.log("Item: ", item);
  return (
    <Card>
      <Head>
        <title>Transaction Overview</title>
      </Head>
      <h2 class="text-2xl font-bold">Transaction</h2>
    </Card>
  );
}
