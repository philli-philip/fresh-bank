import { Button } from "@/components/Button.tsx";
import { Card } from "@/components/card.tsx";
import { AlertTriangle } from "lucide-preact";
import { PageHeader } from "../../pageHeader.tsx";
import PaymentSummary from "./paymentSummary.tsx";

export function SummaryPage(
  { summary, id }: {
    id: string;
    summary: {
      process: number;
      amount: number;
      reference_text?: string;
      account_owner: string;
      contact_label?: string;
      account_number: string;
      bank: string;
      currency: string;
      town?: string;
      country?: string;
      eMail?: null;
      street?: null;
    };
  },
) {
  return (
    <form method="POST">
      <PageHeader title="Summary" pageTitle="New payment" />
      <input hidden name="process" value={id} />
      <PaymentSummary
        payment={{
          amount: summary.amount,
          account_owner: summary.account_owner,
          account_number: summary.account_number,
          bank: summary.bank,
          currency: summary.currency,
          reference_text: summary.reference_text,
        }}
      />
      <Card className="px-12 py-8 mb-6 bg-blue-100 flex gap-4 flex-row">
        <AlertTriangle size="32" class="-ml-2" />
        <div class="flex flex-col gap-2">
          <h3 class="font-semibold text-lg">Approval needed</h3>
          <p class="max-w-xl">
            Your team uses a 4 eye principle for all payments. This means that
            another person from your authorisation group will need to approve
            the payment.
          </p>
        </div>
      </Card>
      <div class="flex flex-row justify-end">
        <Button type="submit">
          Submit payment
        </Button>
      </div>
    </form>
  );
}
