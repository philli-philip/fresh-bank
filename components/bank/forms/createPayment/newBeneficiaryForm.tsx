import { Button, LinkButton } from "@/components/Button.tsx";
import { Card } from "@/components/card.tsx";
import { countryFlags } from "@/data/countries.ts";

export function NewBeneficiaryForm() {
  return (
    <>
      <form action="" method="POST" id="new-beneficiary">
        <Card className="pl-12 pr-6 py-8">
          <div class="flex flex-row justify-between items-baseline">
            <h2 class="font-semibold text-lg pb-4">New beneficiary</h2>
            <LinkButton style="link" href="?new_beneficiary=false">
              Existing contact
            </LinkButton>
          </div>
          <div class="flex flex-col gap-4 md:grid-cols-2">
            <div class="flex flex-row gap-8 items-center">
              <label
                class="w-1/4 text-sm font-medium text-gray-700 mb-1"
                for="account_holder"
              >
                Account Holder
              </label>
              <input
                id="account_holder"
                type="text"
                name="account_holder"
                required
                class="flex-1 border col-span-2 rounded-sm border-gray-400 px-2 py-1"
              />
            </div>
            <div class="flex flex-row gap-8 items-center">
              <label class="w-1/4 block text-sm font-medium text-gray-700 mb-1">
                Account Number
              </label>
              <input
                type="text"
                name="account_number"
                required
                class="flex-1 border rounded-sm border-gray-400 px-2 py-1"
              />
            </div>
            <div class="flex flex-row gap-8 items-center">
              <label class="w-1/4 block text-sm font-medium text-gray-700 mb-1">
                Bank
              </label>
              <input
                type="text"
                name="bank"
                required
                class="flex-1 border rounded-sm border-gray-400 px-2 py-1"
              />
            </div>
            <div class="flex flex-row gap-8 items-center">
              <label class="w-1/4 block text-sm font-medium text-gray-700 mb-1">
                Town
              </label>
              <input
                type="text"
                name="town"
                required
                class="flex-1 border rounded-sm border-gray-400 px-2 py-1"
              />
            </div>
            <div class="flex flex-row gap-8 items-center">
              <label class="w-1/4 block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                name="country"
                required
                class="flex-1 border rounded-sm border-gray-400 px-2 py-1"
              >
                {Object.entries(countryFlags).map(([code, { name }]) => (
                  <option value={code}>{name}</option>
                ))}
              </select>
            </div>
            <div class="flex flex-row gap-8 items-center">
              <label class="w-1/4 block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                class="flex-1 border rounded-sm border-gray-400 px-2 py-1"
              />
            </div>
          </div>
        </Card>
        <div class="pt-4 flex flex-row justify-end">
          <Button type="submit">
            Save Beneficiary
          </Button>
        </div>
      </form>
    </>
  );
}
