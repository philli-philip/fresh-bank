import { define } from "@/utils/utils.ts";
import { Card } from "@/components/card.tsx";
import Message from "@/components/message.tsx";
import { Button, LinkButton } from "@/components/Button.tsx";
import { page } from "fresh";
import { db } from "@/services/db.ts";

export const handler = define.handlers({
  GET(ctx) {
    const id = ctx.params.id;

    const summary = db.prepare(`
      SELECT
        *
      FROM draft_payments
      LEFT JOIN contacts ON draft_payments.beneficiary_id = contacts.id
      WHERE draft_payments.id = ${id}
      `).get() as unknown as {
      process: number;
      amount: number;
      reference_text?: string;
      account_owner: string;
      contact_label?: string;
      account_number: string;
      bank: string;
      currency: string;
      town?: string;
      country?: string;
      eMail?: null;
      street?: null;
    };

    console.log("Summary: ", summary);
    return page({ id, summary });
  },
  async POST(ctx) {
    const formdata = await ctx.req.formData();
    const id = formdata.get("process");

    db.exec(`DELETE FROM draft_payments WHERE id = ${id}`);

    return new Response(null, {
      status: 302,
      headers: {
        location: "./../../",
      },
    });
  },
});

export default define.page<typeof handler>((props) => {
  if (!props.data.id) {
    return (
      <Message
        title="Something went wrong"
        subline="The form cannot be continued"
      >
        <LinkButton href="./../../">Back</LinkButton>
      </Message>
    );
  }

  return (
    <form method="POST">
      <input hidden name="process" value={props.data.id} />
      <Card className="px-12 py-6">
        Summary
        <div>
          <span>Receipient</span>
          <span>
            {props.data.summary.contact_label ??
              props.data.summary.account_owner}
          </span>
          <span>{props.data.summary.amount}</span>
          <span>{props.data.summary.currency}</span>
        </div>
      </Card>
      <div class="flex flex-row pt-4 justify-end">
        <Button type="submit">
          Submit payment
        </Button>
      </div>
    </form>
  );
});
