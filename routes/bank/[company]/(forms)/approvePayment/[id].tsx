import { page } from "fresh";
import { define, isDev } from "@/utils/utils.ts";
import { db } from "@/services/db.ts";
import Message from "@/components/message.tsx";
import { Card } from "@/components/card.tsx";
import { PageHeader } from "@/components/bank/pageHeader.tsx";
import { Button } from "@/components/Button.tsx";
import PaymentSummary from "@/components/bank/forms/createPayment/paymentSummary.tsx";

export const handler = define.handlers({
  GET(ctx) {
    isDev() && console.log("context", ctx.params.id);
    return page({ id: ctx.params.id });
  },
  async POST(ctx) {
    const id = Number(ctx.params.id);
    isDev() && console.log(id);
    const formdata = await ctx.req.formData();
    const action = formdata.get("action");

    try {
      if (action === "approve") {
        isDev() && console.log("Let's approve");
        db.prepare(
          `UPDATE draft_payments SET status = 'scheduled' WHERE id = ${id}`,
        ).run();
      }

      if (action === "reject") {
        isDev() && console.log("Let's reject");
        db.prepare(`
          DELETE FROM draft_payments
          WHERE id = ${id}
          `).run();
      }

      return new Response(null, {
        status: 302,
        headers: {
          location: `./../`,
        },
      });
    } catch (e) {
      console.log(
        e instanceof Error
          ? e.message
          : "Error while processing payment approve or reject",
      );
      return new Response(null, {
        status: 500,
      });
    }
  },
});

export default define.page<typeof handler>((props) => {
  const item = db.prepare(`
        SELECT
            *
        FROM
            draft_payments
            LEFT JOIN contacts ON contacts.id = draft_payments.beneficiary_id
        WHERE
            draft_payments.id = ${Number(props.data.id)}`).get() as {
    status: string;
    account_number: string;
    currency: string;
    amount: number;
    account_owner: string;
    reference_text: string;
  };
  isDev() && console.log("item:", item);

  if (!item) {
    return <Message className="px-12 h-[90svh]" title="Item not found!" />;
  }
  if (item.status !== "authorisation") {
    return (
      <Message
        className="px-12 h-[90svh]"
        title="The payment is not available for authorisation"
        subline="Maybe it as alrady been authorised by a colleague or was deleted!"
      />
    );
  }
  return (
    <>
      <PageHeader title="Approve payment" />
      <div class="flex flex-row gap-6">
        <div class="flex-col flex-1 flex gap-6">
          <PaymentSummary
            payment={{
              amount: item.amount,
              currency: item.currency,
              account_number: item.account_number,
              account_owner: item.account_owner,
              reference_text: item.reference_text,
            }}
          />
        </div>
        <div class="flex-col flex-1 max-w-sm flex gap-6">
          <Card className="px-6 py-4">
            <p class="font-semibold pb-2">Authorise</p>
            <p class="pb-8">
              Once authorised the payment is scheduled and will be executed on
              the execution date.
            </p>
            <div class="flex flex-row gap-3 justify-end">
              <form method="POST">
                <input hidden name="action" value="reject" />
                <Button type="submit" style="red">Reject</Button>
              </form>
              <form method="POST">
                <input hidden name="action" value="approve" />
                <Button type="submit">Approve payment</Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
});
