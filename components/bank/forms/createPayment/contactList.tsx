import { Head } from "fresh/runtime";
import { Contact } from "@/services/contacts.ts";
import { Card } from "@/components/card.tsx";
import { countryFlags } from "@/data/countries.ts";
import { Button } from "@/components/Button.tsx";
import { ArrowRight } from "lucide-preact";

export function ContactList(
  { contacts, search }: { contacts: Contact[]; search?: string },
) {
  return (
    <main>
      <Head>
        <title>New Payment</title>
      </Head>
      <h1 class="text-xl pt-3 pb-6 font-semibold">
        Beneficiary
      </h1>
      <Card>
        <div class="flex flex-row justify-between border-b border-gray-200 pl-12 py-8 pr-6">
          <form action="" method="GET">
            <input
              type="text"
              accessKey="f"
              placeholder="Search beneficiery..."
              class="border rounded-sm border-gray-400 px-2 py-1"
              name="search"
              value={search ?? ""}
            />
          </form>
          <a>New beneficiary</a>
        </div>
        <form action="" method="POST" id="beneficiary">
          <ul>
            {contacts.map((item) => (
              <li class="relative not-last:border-b border-gray-200 hover:bg-gray-100 has-focus:bg-blue-600/10 ">
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
        </form>
      </Card>
      <div class="pt-4 flex flex-row justify-end">
        <Button type="submit" form="beneficiary">
          Continue
          <ArrowRight />
        </Button>
      </div>
    </main>
  );
}
