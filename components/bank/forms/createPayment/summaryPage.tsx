import { Button } from "@/components/Button.tsx";
import { Card } from "@/components/card.tsx";
import { Head } from "fresh/runtime";
import { AlertTriangle } from "lucide-preact";

export function renderAmount(
  cent: number,
  currency: string,
  locale?: string,
  showCurreny?: boolean,
) {
  const formatter = new Intl.NumberFormat(locale ?? "de-DE", {
    style: "currency",
    minimumFractionDigits: 2,
    currency: currency,
    currencyDisplay: showCurreny ?? true ? "code" : undefined,
  });

  return formatter.format(cent);
}

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
      <Head>
        <title>
          New Payment
        </title>
      </Head>
      <input hidden name="process" value={id} />
      <Card className="px-12 py-6 flex flex-col gap-2 mb-6">
        <h1 class="font-semibold text-lg col-span-3">Summary</h1>
        <div class="grid grid-cols-[1fr_3fr] gap-2 pb-8">
          <span class="row-span-3">Receipient</span>
          <span class="font-semibold">
            {summary.contact_label ?? summary.account_owner}
          </span>
          <span class="">{summary.bank}</span>
          <span class="">{summary.account_number}</span>
        </div>
        <div class="grid grid-cols-[1fr_3fr] gap-2 pb-8">
          <span class="">Amount</span>
          <span>{renderAmount(summary.amount / 100, summary.currency)}</span>
          <span class="">Reference</span>
          <span>{summary.reference_text}</span>
          <span class="">Execution</span>
          <span>Instantly after authorisation</span>
        </div>
      </Card>
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
