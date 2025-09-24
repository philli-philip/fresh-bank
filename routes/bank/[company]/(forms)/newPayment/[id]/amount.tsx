import { page } from "fresh";
import { define, isDev } from "@/utils/utils.ts";
import { db } from "@/services/db.ts";
import { AmountPage } from "@/components/bank/forms/createPayment/amountPage.tsx";
import { getContact } from "@/services/contacts.ts";

export const handler = define.handlers({
  GET(ctx) {
    const id = ctx.params.id;
    const process = db.prepare(
      `SELECT * FROM draft_payments WHERE id = ${id}`,
    )
      .get() as unknown as {
        id: string;
        beneficiary_id?: number;
        amount?: number;
        reference_text?: string;
      };

    if (!process.beneficiary_id) {
      return new Response(null, {
        status: 302,
        headers: {
          location: "./",
        },
      });
    }
    const beneficiary = getContact(process.beneficiary_id);

    return page({ beneficiary, id, process });
  },
  async POST(ctx) {
    const formData = await ctx.req.formData();
    isDev() && console.log("FOrm:", formData);

    const amountData = Number(formData.get("amount")) * 100;
    const reference = formData.get("reference")?.toString();
    const id = Number(formData.get("process"));

    db.prepare(
      `UPDATE draft_payments
      SET
        amount = '${amountData}',
        reference_text = '${reference}'
      WHERE id = ${id}`,
    )
      .run();

    return new Response(null, {
      status: 302,
      headers: {
        location: "./summary",
      },
    });
  },
});

export default define.page<typeof handler>((props) => {
  return (
    <AmountPage
      beneficiary={props.data.beneficiary}
      process={Number(props.data.id)}
      amount={props.data.process.amount}
      reference_text={props.data.process.reference_text}
    />
  );
});
