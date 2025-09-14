import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("./services/db.sqlite");

export { db };
