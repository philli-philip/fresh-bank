import { Contact } from "@/utils/types.ts";
import { db } from "./db.ts";

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
