import { PageHeader } from "@/components/bank/pageHeader.tsx";
import { db } from "@/services/db.ts";
import { Card } from "@/components/card.tsx";
import Message from "@/components/message.tsx";
import { renderAmount } from "@/utils/formats.ts";
import { ChevronRight } from "lucide-preact";

export default function Page() {
  const pendings = db.prepare(
    `SELECT
      *,
      draft_payments.id as id,
      COALESCE(beneficiary_data->>'contact_label', beneficiary_data->>'account_owner') as name
    FROM
      draft_payments
    WHERE
	    status = 'authorisation'`,
  ).all() as {
    id: number;
    amount: number;
    name: string;
    currency: string;
    account_number: string;
  }[];
  return (
    <>
      <PageHeader title="Pending authorisations" />
      {pendings.length === 0
        ? (
          <Card>
            <Message
              className="px-24 py-16"
              title="No payments to authorise"
              subline="You might feel sad. But nothing to authorise is a good thing."
            />
          </Card>
        )
        : (
          <Card>
            <ul>
              {pendings.map((item) => (
                <li class="not-last:border-b relative hover:bg-gray-100 group cursor-pointer duration-75 px-4 flex flex-row *:flex-1 py-3 border-gray-200">
                  <span>{item.name}</span>
                  <span>{item.account_number}</span>
                  <span class="text-right">
                    {renderAmount(item.amount, item.currency)}
                  </span>
                  <span class="text-blue-800 flex flex-row gap-1 items-center justify-end group-hover:text-blue-700 duration-75">
                    Review
                    <ChevronRight size="16" />
                  </span>
                  <a
                    href={`/bank/all/approvePayment/${item.id}`}
                    class="absolute inset-0 z-10"
                  />
                </li>
              ))}
            </ul>
          </Card>
        )}
    </>
  );
}
