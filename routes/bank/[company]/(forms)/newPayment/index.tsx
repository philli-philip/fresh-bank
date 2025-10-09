import { define } from "@/utils/utils.ts";
import { page } from "fresh";
import { ContactList } from "@/components/bank/forms/createPayment/contactList.tsx";
import { NewBeneficiaryForm } from "@/components/bank/forms/createPayment/newBeneficiaryForm.tsx";
import { getContacts } from "@/services/contacts.ts";
import { db } from "@/services/db.ts";
import { Contact } from "@/utils/types.ts";

export const handler = define.handlers({
  GET(ctx) {
    console.log(ctx.url.searchParams.get("search"));
    const search = ctx.url.searchParams.get("search")?.toString();
    const newBeneficiary =
      ctx.url.searchParams.get("new_beneficiary") === "true";
    const contacts = getContacts({
      filter: search ? `WHERE contact_label LIKE '%${search}%'` : undefined,
    });
    return page({ contacts, search, newBeneficiary });
  },
  async POST(ctx) {
    const form = await ctx.req.formData();
    console.log("form:", form);
    const accountHolder = form.get("account_holder");

    console.log("account holder:", accountHolder);

    let lastInsertRowid;

    if (accountHolder) {
      // New beneficiary submission
      const beneficiaryData = {
        account_owner: accountHolder,
        town: form.get("town"),
        account_number: form.get("account_number"),
        bank: form.get("bank"),
        email: form.get("email"),
        country: form.get("country"),
      };

      const data = db.prepare(
        `INSERT INTO draft_payments (beneficiary_data) VALUES(?)`,
      ).run(JSON.stringify(beneficiaryData));
      lastInsertRowid = data.lastInsertRowid;
    } else {
      // Existing beneficiary selection
      const bene_id = form.get("beneficiary");
      const beneficiary = db.prepare(
        `SELECT * FROM contacts WHERE id = ${bene_id}`,
      ).get() as Contact | undefined;
      if (!beneficiary) {
        return new Response(
          "Beneficiary not found",
          { status: 404 },
        );
      }
      const data = db.prepare(
        `INSERT INTO draft_payments (beneficiary_data) VALUES(?)`,
      ).run(JSON.stringify(beneficiary));
      lastInsertRowid = data.lastInsertRowid;
    }

    console.log("Data; ", lastInsertRowid);
    return new Response(
      null,
      {
        status: 302,
        headers: {
          location: `./newPayment/${lastInsertRowid}/amount/`,
        },
      },
    );
  },
});

export default define.page<typeof handler>((props) => {
  const { contacts, search, newBeneficiary } = props.data;
  return (
    <main>
      <h1 class="text-xl pt-3 pb-6 font-semibold">
        Beneficiary
      </h1>
      {newBeneficiary
        ? <NewBeneficiaryForm />
        : <ContactList contacts={contacts} search={search} />}
    </main>
  );
});
