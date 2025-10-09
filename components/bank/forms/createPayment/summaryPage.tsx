import { Button } from "@/components/Button.tsx";
import { Card } from "@/components/card.tsx";
import { AlertTriangle } from "lucide-preact";
import { PageHeader } from "../../pageHeader.tsx";
import PaymentSummary from "./paymentSummary.tsx";
import { Contact } from "@/utils/types.ts";

export function SummaryPage(
  { id, payment, beneficiary }: {
    id: string;
    process: number;
    payment: {
      amount: number;
      reference?: string;
    };
    beneficiary: Contact;
  },
) {
  return (
    <form method="POST">
      <PageHeader title="Summary" pageTitle="New payment" />
      <input hidden name="process" value={id} />
      <PaymentSummary
        payment={{
          amount: payment.amount,
          account_owner: beneficiary.account_owner,
          account_number: beneficiary.account_number,
          bank: beneficiary.bank,
          currency: beneficiary.currency,
          reference_text: payment.reference,
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
