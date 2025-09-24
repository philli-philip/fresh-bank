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
import { Plus } from "lucide-preact";

export default function Index(ctx: Context<State>) {
  const data = db.prepare(`
    SELECT
      COALESCE (name, legal_name) as companyName
    FROM 
      companies
    WHERE 
      slug is ?
    `).get(ctx.params.company) as { companyName: string } | undefined;

  const title = ctx.params.company === "all"
    ? "Dashboard"
    : `Dashboard – ${data?.companyName}`;

  return (
    <div>
      <Head>
        <title>
          {title}
        </title>
      </Head>
      <div class="flex flex-row justify-between pt-4 pb-6 items-center">
        <h1 class="text-2xl font-medium">{title}</h1>
        <Dropdown>
          <Button type="button" size="medium">
            Create new <Plus size="20" />
          </Button>
          <DropdownMenu position="right">
            <DropdownItemLink href={`/bank/${ctx.params.company}/newPayment/`}>
              New payment
            </DropdownItemLink>
          </DropdownMenu>
        </Dropdown>
      </div>
      <main class="grid-cols-1 md:grid-cols-2 lg:md-grid-cols-3 grid">
        <DayRecap company={ctx.params.company} />
      </main>
    </div>
  );
}
