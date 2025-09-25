import { renderAmount } from "@/utils/formats.ts";
import { Card } from "@/components/card.tsx";

export default function PaymentSummary({ payment }: {
  payment: {
    contact_label?: string;
    account_owner: string;
    bank?: string;
    account_number: string;
    amount: number;
    currency: string;
    reference_text?: string;
  };
}) {
  return (
    <Card className="px-12 py-6 flex flex-col gap-2 mb-6">
      <div class="grid grid-cols-[1fr_3fr] gap-2 pb-8">
        <span class="row-span-3">Receipient</span>
        <span class="font-semibold">
          {payment.contact_label ?? payment.account_owner}
        </span>
        <span class="">{payment.bank}</span>
        <span class="">{payment.account_number}</span>
      </div>
      <div class="grid grid-cols-[1fr_3fr] gap-2">
        <span class="">Amount</span>
        <span>{renderAmount(payment.amount, payment.currency)}</span>
        <span class="">Reference</span>
        <span>{payment.reference_text}</span>
        <span class="">Execution</span>
        <span>Instantly after authorisation</span>
      </div>
    </Card>
  );
}
