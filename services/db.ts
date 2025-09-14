import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("./data/db.sqlite");

export { db };
