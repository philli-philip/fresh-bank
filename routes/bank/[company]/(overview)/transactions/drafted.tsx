import { define } from "@/utils/utils.ts";
import { db } from "@/services/db.ts";
import { Card } from "@/components/card.tsx";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
} from "@/components/dropdown/dropdown.tsx";
import { MoreVertical, Plus, Trash } from "lucide-preact";
import { LinkButton } from "@/components/Button.tsx";
import { PageHeader } from "@/components/bank/pageHeader.tsx";
import Message from "@/components/message.tsx";
import { renderAmount } from "@/utils/formats.ts";

export const handler = define.handlers({
  async POST(ctx) {
    const formData = await ctx.req.formData();
    const id = Number(formData.get("id")) ?? undefined;
    const action = formData.get("action");
    if (action === "delete" && id !== undefined) {
      db.prepare("DELETE FROM draft_payments WHERE id = ?").run(id);
    }

    if (action === "edit" && id !== undefined) {
      return new Response(null, {
        status: 302,
        headers: {
          location: `/bank/all/newPayment/${id}/amount/`,
        },
      });
    }

    return ctx.redirect("/bank/overview/transactions/drafted");
  },
});

export default define.page(() => {
  const drafted = db.prepare(`
    SELECT 
      draft_payments.id,
      amount,
      draft_payments.currency,
      COALESCE(contact_label, account_owner) as beneficiary 
    FROM draft_payments
    LEFT JOIN contacts ON contacts.id = draft_payments.beneficiary_id
    WHERE status = 'draft'
    `).all() as {
    id: string;
    amount?: number;
    beneficiary?: string;
    currency: string;
  }[];
  return (
    <>
      <PageHeader title="Drafted payments">
        <LinkButton href="/bank/all/newPayment">
          <Plus size="16" />
          New payment
        </LinkButton>
      </PageHeader>
      <Card>
        {drafted.length === 0 && (
          <Message
            className="px-24 py-16"
            title="No drafted payments"
            subline="Payments are automatically saved during creation"
          >
            <LinkButton href="/bank/all/newPayment/">
              <Plus size="16" />Create Payment
            </LinkButton>
          </Message>
        )}
        <ul>
          {drafted.map((item) => (
            <li class="hover:bg-gray-100 duration-75 grid grid-cols-4 items-center px-4 py-3 justify-between not-last:border-b border-gray-200 relative">
              <span class="font-semibold">{item.id}</span>
              {item.amount
                ? <span>{renderAmount(item.amount / 100, item.currency)}</span>
                : <span class="text-gray-500">Not set</span>}
              {item.beneficiary
                ? <span>{item.beneficiary}</span>
                : <span class="text-gray-500">Not set</span>}
              <Dropdown className="place-self-end z-10">
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
                      <button
                        type="submit"
                        class="w-full flex flex-row gap-2 items-center text-left text-red-600 px-4 py-2 cursor-pointer hover:bg-gray-100 duration-75"
                      >
                        <Trash size="20" />
                        Delete
                      </button>
                    </form>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <a
                href={`/bank/all/newPayment/${item.id}/amount/`}
                class="absolute inset-0"
              />
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
});
