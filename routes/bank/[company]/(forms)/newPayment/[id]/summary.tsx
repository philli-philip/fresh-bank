import { define } from "@/utils/utils.ts";
import Message from "@/components/message.tsx";
import { LinkButton } from "@/components/Button.tsx";
import { page } from "fresh";
import { db } from "@/services/db.ts";
import { SummaryPage } from "@/components/bank/forms/createPayment/summaryPage.tsx";
import { Contact } from "@/utils/types.ts";

export const handler = define.handlers({
  GET(ctx) {
    const id = ctx.params.id;

    const summary = db.prepare(`
      SELECT
        *
      FROM draft_payments
      WHERE draft_payments.id = ${id}
      `).get() as unknown as {
      id: string;
      beneficiary_data: string;
      amount?: number;
      reference_text?: string;
    };

    return page({ id, summary });
  },
  async POST(ctx) {
    const formdata = await ctx.req.formData();
    const id = formdata.get("process");

    db.exec(
      `UPDATE draft_payments SET status = 'authorisation' WHERE id = ${id}`,
    );

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
    <SummaryPage
      payment={{
        amount: props.data.summary.amount ?? 0,
        reference: props.data.summary.reference_text,
      }}
      process={Number(props.data.id)}
      beneficiary={JSON.parse(props.data.summary.beneficiary_data) as Contact}
      id={props.data.id}
    />
  );
});
