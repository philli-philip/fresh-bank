import { ArrowRight } from "lucide-preact";
import { Button } from "@/components/Button.tsx";
import { Card } from "@/components/card.tsx";
import { Contact } from "@/services/contacts.ts";
import { Head } from "fresh/runtime";

export function AmountPage(
  { beneficiary, process }: { beneficiary: Contact; process: number },
) {
  return (
    <form method="POST">
      <Head>
        <title>New Payment</title>
      </Head>
      <main class="container mx-auto px-6">
        <Card className="px-12 py-8 mb-8 grid grid-rows-2">
          <div class="flex flex-row gap-2">
            <span>
              From:
            </span>
            <span class="font-semibold">Main Account</span>
            <span class="">Main Account</span>
          </div>

          <div class="flex flex-row gap-2">
            <span>To:</span>
            <span class="flex-col">
              <span class="block font-semibold">
                {beneficiary.contact_label}
              </span>
              <span class="block">{beneficiary.account_number}</span>
            </span>
          </div>

          <label class="flex flex-col gap-2 col-span-2">
            Amount
            <div class="flex flex-row gap-1 items-baseline text-2xl ">
              <span>
                €
              </span>
              <input
                hx-
                className="before:content-[EUR] px-4 py-3 -mx-4 appearance-none"
                step="0.1"
                type="text"
                name="amount"
                placeholder="0.00"
                class="p-4"
                required
              />
            </div>
          </label>
        </Card>
        <Card className="px-12 py-8">
          <label class="flex flex-col gap-1">
            Reference
            <input
              class="border rounded border-gray-200 p-2"
              name="reference"
              type="text"
              placeholder="Payment reference or customer reference"
            />
          </label>
        </Card>
        <div class="flex flex-row justify-end pt-4">
          <input hidden value={process} name="process" />
          <Button type="submit">
            Continue
            <ArrowRight size="20" />
          </Button>
        </div>
      </main>
    </form>
  );
}
