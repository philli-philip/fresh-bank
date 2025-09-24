import { define } from "@/utils/utils.ts";
import { db } from "@/services/db.ts";
import { Card } from "@/components/card.tsx";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
} from "@/components/dropdown/dropdown.tsx";
import { MoreVertical } from "lucide-preact";

export const handler = define.handlers({
  async POST(ctx) {
    const formData = await ctx.req.formData();
    const id = Number(formData.get("id")) ?? undefined;
    const action = formData.get("action");
    if (action === "delete" && id !== undefined) {
      db.prepare("DELETE FROM draft_payments WHERE id = ?").run(id);
    }
    return ctx.redirect("/bank/overview/transactions/drafted");
  },
});

export default define.page(() => {
  const drafted = db.prepare("SELECT * FROM draft_payments").all() as {
    id: string;
    amount?: number;
    beneficiary?: string;
  }[];
  return (
    <div>
      <h1>Drafted payments</h1>
      <Card>
        <ul>
          {drafted.map((item) => (
            <li class="grid grid-cols-2 items-center px-4 py-3 justify-between not-last:border-b border-gray-200 relative">
              {item.id}
              <Dropdown className="place-self-end">
                <button
                  type="button"
                  class="p-2 rounded-sm hover:bg-gray-200 duration-75 cursor-pointer"
                >
                  <MoreVertical size="20" />
                </button>
                <DropdownMenu position="right">
                  <DropdownItem>
                    <form method="POST">
                      <input hidden name="id" value={item.id} />
                      <input hidden name="action" value="delete" />
                      <button type="submit">Delete</button>
                    </form>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
});
