import { db } from "./db.ts";

export function getContacts() {
  return db.prepare(`
        SELECT
            *
        FROM contacts
        `).all() as {
    id: number;
    account_owner: string;
    contact_label: string;
    account_number: string;
    bank: string;
    currency: string;
    town: string;
    country: string;
    eMail: string;
    street: string;
  }[];
}
