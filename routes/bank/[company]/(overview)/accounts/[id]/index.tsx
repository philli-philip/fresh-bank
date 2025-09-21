import { Head } from "fresh/runtime";
import { getAccount } from "@/services/accounts.ts";
import Message from "@/components/message.tsx";
import { Card } from "@/components/card.tsx";

export default function AccountDetail(
  ctx: { params: { company: string; id: string } },
) {
  const account = getAccount(Number(ctx.params.id));

  if (isNaN(Number(ctx.params.id))) {
    return <Message title="Account not found" />;
  }
  if (!account) {
    return <Message title="Account not found" />;
  }
  return (
    <>
      <Head>
        <title>{account.number} — Account Detail</title>
      </Head>
      <Card className="divide-y divide-gray-200 p-6">
        <div className="">
          <p className="text-sm font-medium text-gray-500">Name</p>
          <p className="mt-1 text-lg font-medium text-gray-900">
            {account.number}
          </p>
        </div>
        <div className="">
          <p className="text-sm font-medium text-gray-500">Number</p>
          <p className="mt-1 text-lg font-medium text-gray-900">
            {account.number}
          </p>
        </div>
      </Card>
    </>
  );
}
