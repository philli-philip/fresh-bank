import { DatabaseSync } from "node:sqlite";
import { generateQuickHash } from "../utils/hash.ts";

const db = new DatabaseSync("./data/db.sqlite");

// Clear existing data
db.exec("DROP TABLE IF EXISTS transactions");
db.exec("DROP TABLE IF EXISTS accounts");
db.exec("DROP TABLE IF EXISTS external_accounts");
db.exec("DROP TABLE IF EXISTS tasks");
db.exec("DROP TABLE IF EXISTS companies");
db.exec("DROP TABLE IF EXISTS contacts");
db.exec("DROP TABLE IF EXISTS draft_payments");

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

// Accounts
db.exec(
  `CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    number TEXT NOT NULL UNIQUE,
    currency TEXT CHECK(currency IN ('USD', 'EUR')),
    balance Integer DEFAULT 0,
    company TEXT,
    country TEXT NOT NULL DEFAULT DE,
    FOREIGN KEY (company) REFERENCES companies (slug)
  )`,
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

db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account_owner TEXT NOT NULL,
  contact_label TEXT,
  account_number TEXT NOT NULL,
  bank TEXT NOT NULL,
  currency TEXT NOT NULL,
  town TEXT DEFAULT 'Berlin',
  country TEXT DEFAULT 'DE',
  eMail TEXT,
  street TEXT
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS draft_payments(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    beneficiary_id INTEGER,
    amount INTEGER,
    reference_text TEXT,
    currency TEXT DEFAULT 'EUR',
    status TEXT CHECK(status IN ('hidden', 'authorisation')) DEFAULT hidden
  )`);

const countries = ["IT", "DE", "US"];
const currencies = ["USD", "EUR"];
const banks = ["FRESH", "other"];
const companyNames = [{ legalName: "Carrot Plastics", slug: "carrot-plast" }, {
  legalName: "Carrot Steel",
  slug: "carrot-steel",
}, {
  legalName: "Carrot Oil",
  slug: "carrot-oil",
}];

export function pickRandom<T>(
  array: T[],
): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function accountNumberGenerator(): number {
  return Math.floor(Math.random() * 100000) + 10_000_000;
}

const contacts = [{ legalName: "Rental office GmbH", name: "Landloard HQ" }, {
  legalName: "Flower for Offic AG",
  name: "Flower subsciption",
}];

function createRandomeContacts(count: number) {
  for (let i = 0; i < count; i++) {
    const item = {
      accountOwner: pickRandom(contacts).legalName,
      contact_label: pickRandom(contacts).name,
      account_number: accountNumberGenerator(),
      bank: "other",
      currency: pickRandom(currencies),
    };
    db.exec(`
      INSERT OR IGNORE INTO contacts (account_owner, contact_label, account_number, bank, currency) 
        VALUES ('${item.accountOwner}', '${item.contact_label}', '${item.account_number}', '${item.bank}', '${item.currency}')
      `);
  }
}

function createRandomCompany(count: number) {
  for (let i = 0; i < count; i++) {
    const item = {
      slug: pickRandom(companyNames).slug,
      legalName: pickRandom(companyNames).legalName,
      country: pickRandom(countries),
    };
    db.exec(
      `INSERT OR IGNORE INTO companies (slug, legal_name, country) VALUES ('${item.slug}', '${item.legalName}', '${item.country}')`,
    );
  }
}

function createRandomExtAccont(count: number) {
  for (let i = 0; i < count; i++) {
    const item = {
      number: accountNumberGenerator(),
      currency: pickRandom(currencies),
      bank: pickRandom(["other"]),
    };
    db.exec(
      `INSERT INTO external_accounts (number, currency, bank) VALUES ('${item.number}', '${item.currency}', '${item.bank}')`,
    );
  }
}

// Accounts

function createRandomAccount(count: number) {
  for (let i = 0; i < count; i++) {
    const item = {
      number: accountNumberGenerator(),
      currency: pickRandom(currencies),
      balance: Math.random() * 100000,
      companySlug: pickRandom(companyNames).slug,
      country: pickRandom(countries),
    };
    db.exec(
      `INSERT OR IGNORE INTO accounts (number, currency, balance, company, country) VALUES ('${item.number}', '${item.currency}', ${item.balance}, '${item.companySlug}', '${item.country}')`,
    );
  }
}

function createRandomTransaction(count: number) {
  for (let i = 0; i < count; i++) {
    const item = {
      hash: generateQuickHash(12),
      amount: Math.floor(Math.random() * 10000),
      date: new Date((Math.random() * 50_000_000_000) + 1_720_000_000_000),
      currency: pickRandom(currencies),
      debit_account_id: Math.floor(Math.random() * 10),
      credit_account_id: Math.floor(Math.random() * 10),
      debit_account_bank: pickRandom(banks),
      credit_account_bank: pickRandom(banks),
    };
    db.exec(
      `INSERT INTO transactions (hash, amount, date, currency, debit_account_id, debit_account_bank, credit_account_id, credit_account_bank) 
      VALUES (
        '${item.hash}',
        '${item.amount}',
        '${item.date}',
        '${item.currency}',
        '${item.debit_account_id}',
        '${item.debit_account_bank}',
        '${item.credit_account_id}',
        '${item.credit_account_bank}')`,
    );
  }
}

createRandomeContacts(5);
createRandomExtAccont(5);
createRandomCompany(10);
createRandomAccount(10);
createRandomTransaction(100);
