import { Context } from "fresh";
import { State } from "../../utils/utils.ts";
import { ChevronsUpDown } from "npm:lucide-preact";
import {
  Dropdown,
  DropdownItemDivider,
  DropdownItemLink,
  DropdownMenu,
} from "../dropdown/dropdown.tsx";
import { db } from "../../services/db.ts";

export function Navigation({ ctx }: { ctx: Context<State> }) {
  console.log(ctx.params);
  const pathname = ctx.url.pathname;
  const item = ctx.url.pathname.split("/")[4] ?? undefined;
  const urlSection = ctx.url.pathname.split("/")[3] ?? "bank";
  const company = ctx.url.pathname.split("/")[2] ?? "all;";
  console.log("Pathname: ", pathname);
  console.log("Section: ", urlSection);
  console.log("Company: ", company);
  console.log("Item: ", item);

  const currentCompany = db
    .prepare(
      "SELECT COALESCE(name, legal_name) as name, slug FROM companies WHERE slug = ?",
    )
    .get(company) as { name: string; slug: string } ??
    { name: "All companies", slug: "all" };

  const companies = db
    .prepare("SELECT COALESCE(name, legal_name) as name, slug FROM companies")
    .all() as { name: string; slug: string }[];

  let itemTitle = undefined;
  if (urlSection === "accounts" && item) {
    itemTitle = db.prepare("SELECT number FROM accounts WHERE id = ?").get(
      item,
    )?.number as string;
  }

  const navObject = buildNavigation(urlSection, company, itemTitle);
  console.log(navObject);

  return (
    <nav class="pt-3 border border-b border-gray-200 sticky top-0 bg-white">
      <div class="container mx-auto px-4 flex flex-col justify-between items-start">
        <div class=" flex flex-row items-center gap-2">
          <a
            href="/bank/all/"
            class="text-black font-semibold px-3 py-1 -ml-3 rounded hover:bg-gray-100 block"
          >
            Bank
          </a>
          <span class="text-gray-300 font-light">/</span>
          <Dropdown>
            <span class="flex flex-row items-center">
              <a
                class="px-3 py-1 block rounded hover:bg-gray-100"
                href={`/bank/${currentCompany.slug}`}
              >
                {currentCompany.name}
              </a>
              <button
                class="px-2 py-1 cursor-pointer flex flex-row gap-2 h-8 items-center hover:bg-gray-100 rounded-sm cursor-pointer"
                type="button"
              >
                <ChevronsUpDown size="12" />
              </button>
            </span>
            <DropdownMenu>
              <DropdownItemLink href={`/bank/all/${urlSection}`}>
                All companies
              </DropdownItemLink>
              <DropdownItemDivider />
              {companies.map((company) => (
                <DropdownItemLink
                  key={company.name}
                  href={`/bank/${company.slug}/${
                    urlSection === "bank" ? "" : urlSection
                  }`}
                >
                  {company.name}
                </DropdownItemLink>
              ))}
            </DropdownMenu>
          </Dropdown>
          {navObject.breadCrump.section && (
            <>
              <span class="text-gray-300 font-light">/</span>
              <a
                href={navObject.breadCrump.href}
                class="px-3 py-1 rounded hover:bg-gray-100 block text-gray-700"
              >
                {navObject.breadCrump.section}
              </a>
            </>
          )}
          {navObject.breadCrump.title && (
            <>
              <span class="text-gray-300 font-light">/</span>
              <h1 class="px-2">
                {navObject.breadCrump.title}
              </h1>
            </>
          )}
        </div>
        <ul class="flex space-x-4">
          {navObject.tabNav.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                class="block text-gray-700 px-0 pb-2 pt-2 data-[current=true]:after:w-full data-[current=true]:font-semibold after:rounded-full data-[current=true]:after:left-0 relative after:w-0 after:duration-75 after:left-1/2 hover:after:left-0 hover:after:w-full after:h-0.5  after:absolute after:bottom-0 after:bg-black"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function buildNavigation(section: string, company: string, item?: string) {
  return {
    breadCrump: buildBreadCrump(section, company, item),
    tabNav: buildTabNav(section, company, item),
  };
}

function buildBreadCrump(section: string, company: string, item?: string) {
  // If we do not have an item, we are in an overview
  if (!item) {
    return {
      section: sectionTitles[section as keyof typeof sectionTitles],
      title: undefined,
      href: `/bank/${company}/${section}`,
    };
  }
  // If we have an item, we are in a detail view
  return {
    section: sectionTitles[section as keyof typeof sectionTitles],
    title: item,
    href: `/bank/${company}/${section}`,
  };
}

function buildTabNav(section: string, company?: string, itemLabel?: string) {
  if (!itemLabel) {
    return categoryNav[section as keyof typeof categoryNav].map(
      (item) => ({
        ...item,
        href: item.href.replace("all", company ?? "all"),
      }),
    );
  }

  return detailNav[section as keyof typeof detailNav].map((item) => ({
    ...item,
    href: item.href.replace("all", company ?? ""),
  }));
}

const sectionTitles = {
  accounts: "Accounts",
  account: "Accounts",
  transactions: "Transactions",
  undefined: "Undefined",
};

const bank = [
  {
    name: "Dashboard",
    href: "/bank/all",
  },
  {
    name: "Accounts",
    href: "/bank/all/accounts",
  },
  {
    name: "Transactions",
    href: "/bank/all/transactions",
  },
] as const;

const accounts = [
  {
    name: "Balances",
    href: "/bank/all/accounts",
  },
] as const;

const accountDetails = [
  {
    name: "Overview",
    href: "/bank/all/accounts/1",
  },
  {
    name: "Transactions",
    href: "/bank/all/accounts/1/transactions",
  },
  { name: "Statements", href: "/bank/all/accounts/1/statements" },
] as const;

const transactions = [
  {
    name: "All",
    href: "/bank/all/transactions",
  },
  {
    name: "Outgoing",
    href: "/bank/all/transactions/outgoing",
  },
] as const;

const detailNav = {
  accounts: accountDetails,
};

const categoryNav = {
  bank,
  accounts,
  transactions,
};
