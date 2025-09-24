import { Button } from "@/components/Button.tsx";
import { Card } from "@/components/card.tsx";
import { Head } from "fresh/runtime";

export function SummaryPage(
  { summary, id }: {
    id: string;
    summary: {
      contact_label?: string;
      account_owner: string;
      amount: number;
      currency: string;
    };
  },
) {
  return (
    <form method="POST">
      <Head>
        <title>
          New Payment
        </title>
      </Head>
      <input hidden name="process" value={id} />
      <Card className="px-12 py-6">
        Summary
        <div>
          <span>Receipient</span>
          <span>
            {summary.contact_label ??
              summary.account_owner}
          </span>
          <span>{summary.amount}</span>
          <span>{summary.currency}</span>
        </div>
      </Card>
      <div class="flex flex-row pt-4 justify-end">
        <Button type="submit">
          Submit payment
        </Button>
      </div>
    </form>
  );
}
