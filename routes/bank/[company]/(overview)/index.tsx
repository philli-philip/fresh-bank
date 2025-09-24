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
import { PageHeader } from "@/components/bank/pageHeader.tsx";
import { Authorisation } from "@/components/bank/dashboard/authorisation.tsx";

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
    <>
      <PageHeader title={title} pageTitle={title}>
        <Dropdown>
          <Button type="button" size="medium">
            Create new <Plus size="20" />
          </Button>
          <DropdownMenu position="right">
            <DropdownItemLink
              href={`/bank/${ctx.params.company}/newPayment/`}
            >
              New payment
            </DropdownItemLink>
          </DropdownMenu>
        </Dropdown>
      </PageHeader>
      <main class="grid-cols-1 md:grid-cols-2 lg:md-grid-cols-3 grid gap-8">
        <DayRecap company={ctx.params.company} />
        <Authorisation company={ctx.params.company} />
      </main>
    </>
  );
}
