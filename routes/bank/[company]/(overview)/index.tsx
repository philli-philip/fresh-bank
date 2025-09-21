import { Context } from "fresh";
import { State } from "@/utils/utils.ts";
import { Head } from "fresh/runtime";
import { db } from "@/services/db.ts";
import DayRecap from "@/components/bank/dashboard/dayRecap.tsx";
import {
  Dropdown,
  DropdownItemLink,
  DropdownMenu,
} from "@/components/dropdown/dropdown.tsx";
import { Button } from "@/components/Button.tsx";
import { ChevronDown, Plus } from "lucide-preact";

export default function Index(ctx: Context<State>) {
  const company = ctx.params.company;
  console.log("Company: ", company);
  const companyName = db.prepare(`
    SELECT
      name as companyName
    FROM 
      companies
    WHERE 
      slug is ?
    `).get(company);

  console.log("Company name: ", companyName);
  return (
    <div>
      <Head>
        <title>
          {company === "all" ? "Dashboard" : `Dashboard – ${companyName}`}
        </title>
      </Head>
      <div class="flex flex-row justify-between pt-4 pb-6 items-center">
        <h1 class="text-2xl font-medium">Dashboard</h1>
        <Dropdown>
          <Button type="button" size="medium">
            Create new <Plus size="20" />
          </Button>
          <DropdownMenu position="right">
            <DropdownItemLink href="/bank/all/newPayment/">
              New payment
            </DropdownItemLink>
          </DropdownMenu>
        </Dropdown>
      </div>
      <main class="grid-cols-3 grid">
        <DayRecap company={company} />
      </main>
    </div>
  );
}
