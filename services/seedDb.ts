import { DatabaseSync } from "node:sqlite";
import { generateQuickHash } from "../utils/hash.ts";

const db = new DatabaseSync("./data/db.sqlite");

// Clear existing data
db.exec("DROP TABLE IF EXISTS transactions");
db.exec("DROP TABLE IF EXISTS accounts");
db.exec("DROP TABLE IF EXISTS external_accounts");
db.exec("DROP TABLE IF EXISTS tasks");
db.exec("DROP TABLE IF EXISTS companies");

// Tasks
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    completed BOOLEAN DEFAULT 0
  );
`);

db.exec("INSERT INTO tasks (title, completed) VALUES ('Buy milk', 0)");
db.exec("INSERT INTO tasks (title, completed) VALUES ('Buy tea', 0)");

// External Accounts
db.exec(`
  CREATE TABLE IF NOT EXISTS external_accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    number TEXT NOT NULL,
    currency TEXT CHECK(currency IN ('USD', 'EUR')),
    bank TEXT
  )
`);

// Companies
db.exec(`
  CREATE TABLE IF NOT EXISTS companies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    legal_name TEXT NOT NULL,
    name TEXT,
    country TEXT NOT NULL
  )
`);

db.exec(
  "INSERT INTO companies (slug, legal_name, country) VALUES ('car-us', 'Carrot Limited US', 'US')",
);
db.exec(
  "INSERT INTO companies (slug, legal_name, country, name) VALUES ('car-eu', 'Carrot AG EU', 'EU', 'Carrot EU')",
);
db.exec(
  "INSERT INTO companies (slug, legal_name, country) VALUES ('car-it', 'Carrot Limited IT', 'IT')",
);
db.exec(
  "INSERT INTO companies (slug, legal_name, country) VALUES ('car-uk', 'Carrot Limited UK', 'GB')",
);

db.exec(
  "INSERT INTO external_accounts (number, currency, bank) VALUES ('1234567890', 'USD', 'other')",
);
db.exec(
  "INSERT INTO external_accounts (number, currency, bank) VALUES ('0987654321', 'EUR', 'other')",
);

// Accounts
db.exec(
  `CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    number TEXT NOT NULL,
    currency TEXT CHECK(currency IN ('USD', 'EUR')),
    balance Integer DEFAULT 0,
    company TEXT,
    country TEXT NOT NULL DEFAULT DE,
    FOREIGN KEY (company) REFERENCES companies (slug)
  )`,
);

// Accounts

db.exec(
  "INSERT INTO accounts (number, currency, balance, company, country) VALUES ('1234567890', 'USD', 0, 'car-us', 'US')",
);
db.exec(
  "INSERT INTO accounts (number, currency, balance, company) VALUES ('0987654321', 'EUR', 10000, 'car-eu')",
);
db.exec(
  "INSERT INTO accounts (number, currency, balance, company, country) VALUES ('0987654322', 'EUR', 200000, 'car-it', 'IT')",
);

// Transactions
db.exec(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hash TEXT NOT NULL,
    amount INTEGER NOT NULL,
    date TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
    currency TEXT CHECK(currency IN ('USD', 'EUR')),
    debit_account_id INTEGER NOT NULL,
    debit_account_bank TEXT CHECK(debit_account_bank IN ('FRESH', 'other')),
    credit_account_id INTEGER NOT NULL,
    credit_account_bank TEXT CHECK(credit_account_bank IN ('FRESH', 'other'))
  );
`);

// Transactions
db.exec(
  "INSERT INTO transactions (hash, amount, date, currency, debit_account_id, debit_account_bank, credit_account_id, credit_account_bank) VALUES ('" +
    generateQuickHash(12) +
    "', '10000', '2023-01-01T00:00:00', 'USD', 1, 'FRESH', 2, 'other')",
);
db.exec(
  "INSERT INTO transactions (hash, amount, date, currency, debit_account_id, debit_account_bank, credit_account_id, credit_account_bank) VALUES ('" +
    generateQuickHash(12) +
    "', '30000', '2023-01-01T00:00:00', 'EUR', 2, 'other', 1, 'FRESH')",
);
db.exec(
  "INSERT INTO transactions (hash, amount, date, currency, debit_account_id, debit_account_bank, credit_account_id, credit_account_bank) VALUES ('" +
    generateQuickHash(12) +
    "','20000', '2023-01-01T00:00:00', 'USD', 1, 'FRESH', 2, 'FRESH')",
);
