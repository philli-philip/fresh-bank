import { Card } from "@/components/card.tsx";
import { getContacts } from "@/services/contacts.ts";
import { countryFlags } from "@/data/countries.ts";
import { Head } from "fresh/runtime";
import { ArrowRight } from "lucide-preact";
import { Button } from "@/components/Button.tsx";

export default function () {
  const contacts = getContacts();
  return (
    <main>
      <h1 class="text-xl pt-3 pb-6 font-semibold">
        Beneficiary
      </h1>
      <Head>
        <title>New Payment</title>
      </Head>
      <form action="./newPayment/mode">
        <Card>
          <div class="flex flex-row justify-between border-b border-gray-200 pl-12 py-8 pr-6">
            <input
              type="text"
              placeholder="Search beneficiery..."
              class="border rounded-sm border-gray-400 px-2 py-1"
            />
            <a>New beneficiary</a>
          </div>

          <ul>
            {contacts.map((item) => (
              <li class="relative border-b border-gray-200 hover:bg-gray-100 has-focus:bg-blue-600/10 ">
                <label class="flex flex-col px-6 pl-12 py-4 cursor-pointer">
                  <span class="col-span-3 font-medium text-lg">
                    {item.contact_label}
                  </span>
                  <span class="flex flex-row gap-4 text-gray-700 *:not-last:after:content-['•'] *:not-last:after:pl-3 *:not-last:after:text-gray-400">
                    <span>{item.account_number}</span>
                    <span>{item.currency}</span>
                    <span>
                      {countryFlags[
                        item.country.toLowerCase() as keyof typeof countryFlags
                      ]
                        .name}
                    </span>
                  </span>
                  <input
                    required
                    type="radio"
                    name="beneficiary"
                    value={item.id}
                    class="absolute top-9 left-4 opacity-0 checked:opacity-100"
                  />
                </label>
              </li>
            ))}
          </ul>
        </Card>
        <div class="pt-4 flex flex-row justify-end">
          <Button type="submit">
            Continue
            <ArrowRight />
          </Button>
        </div>
      </form>
    </main>
  );
}
