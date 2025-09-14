import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("./services/db.sqlite");

// Clear existing data
db.exec("DROP TABLE IF EXISTS transactions");
db.exec("DROP TABLE IF EXISTS accounts");
db.exec("DROP TABLE IF EXISTS external_accounts");
db.exec("DROP TABLE IF EXISTS tasks");

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
    balance Integer DEFAULT 0
  )`,
);

// Accounts

db.exec(
  "INSERT INTO accounts (number, currency, balance) VALUES ('1234567890', 'USD', 0)",
);
db.exec(
  "INSERT INTO accounts (number, currency, balance) VALUES ('0987654321', 'EUR', 10000)",
);

// Transactions
db.exec(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
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
  "INSERT INTO transactions (amount, date, currency, debit_account_id, debit_account_bank, credit_account_id, credit_account_bank) VALUES ('10000', '2023-01-01T00:00:00', 'USD', 1, 'FRESH', 2, 'other')",
);
db.exec(
  "INSERT INTO transactions (amount, date, currency, debit_account_id, debit_account_bank, credit_account_id, credit_account_bank) VALUES ('30000', '2023-01-01T00:00:00', 'EUR', 2, 'other', 1, 'FRESH')",
);
db.exec(
  "INSERT INTO transactions (amount, date, currency, debit_account_id, debit_account_bank, credit_account_id, credit_account_bank) VALUES ('20000', '2023-01-01T00:00:00', 'USD', 1, 'FRESH', 2, 'FRESH')",
);
