import { db } from "./db.ts";

export interface Contact {
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
}

export function getContacts(options?: { filter?: string }) {
  return db.prepare(`
        SELECT
            *
        FROM contacts
        ${options?.filter}
        `).all() as unknown as Contact[];
}

export function getContact(id: number) {
  return db.prepare(`
    SELECT 
      *
    FROM
      contacts
    WHERE id = ${id}
    `).get() as unknown as Contact;
}
