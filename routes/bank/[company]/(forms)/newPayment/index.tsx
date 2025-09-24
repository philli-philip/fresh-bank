import { define } from "@/utils/utils.ts";
import { page } from "fresh";
import { ContactList } from "@/components/bank/forms/createPayment/contactList.tsx";
import { getContacts } from "@/services/contacts.ts";
import { db } from "@/services/db.ts";

export const handler = define.handlers({
  GET(ctx) {
    console.log(ctx.url.searchParams.get("search"));
    const search = ctx.url.searchParams.get("search")?.toString();
    const contacts = getContacts({
      filter: `WHERE contact_label LIKE '%${search}%'`,
    });
    return page({ contacts, search });
  },
  async POST(ctx) {
    const form = await ctx.req.formData();
    const bene_id = form.get("beneficiary");

    const data = db.prepare(
      `INSERT INTO draft_payments (beneficiary_id) VALUES(${bene_id})`,
    ).run();

    console.log("Data; ", data);
    return new Response(
      null,
      {
        status: 302,
        headers: {
          location: `./newPayment/${data.lastInsertRowid}/amount`,
        },
      },
    );
  },
});

export default define.page<typeof handler>((props) => {
  return (
    <ContactList contacts={props.data.contacts} search={props.data.search} />
  );
});
