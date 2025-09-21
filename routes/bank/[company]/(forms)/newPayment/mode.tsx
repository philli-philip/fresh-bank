import { Card } from "@/components/card.tsx";
import { Context } from "fresh";
import { State } from "@/utils/utils.ts";
import { db } from "@/services/db.ts";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
} from "@/components/dropdown/dropdown.tsx";

export default function Page(ctx: Context<State>) {
  const bene_id = ctx.url.searchParams.get("beneficiary");

  const beneficiary = db.prepare(`SELECT * FROM contacts WHERE id = ?`).get(
    bene_id,
  );
  console.log(beneficiary);
  return (
    <main class="container mx-auto px-6">
      <Card className="px-12 py-8">
        <label class="flex flex-col gap-2">
          Amount
          <input type="text" placeholder="0.00" class="p-4" />
        </label>
      </Card>
    </main>
  );
}
