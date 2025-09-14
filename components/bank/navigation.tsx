import { Context } from "fresh";
import { State } from "../../utils/utils.ts";
import { ChevronsUpDown } from "npm:lucide-preact";
import { Dropdown, DropdownItem, DropdownMenu } from "../dropdown/dropdown.tsx";
import { db } from "../../services/db.ts";

export function Navigation({ ctx }: { ctx: Context<State> }) {
  console.log(ctx.url.pathname);

  const item = ctx.url.pathname.split("/")[3] ?? undefined;
  const urlSection = ctx.url.pathname.split("/")[2] ?? "bank";
  console.log("Section: ", urlSection);
  console.log("Item: ", item);

  let itemTitle = undefined;
  if (urlSection === "accounts" && item) {
    itemTitle = db.prepare("SELECT number FROM accounts WHERE id = ?").get(
      item,
    )?.number as string;
  }

  const navObject = buildNavigation(urlSection, itemTitle);
  console.log(navObject);

  return (
    <nav class="pt-3 border border-b border-gray-200 sticky top-0 bg-white">
      <div class="container mx-auto px-4 flex flex-col justify-between items-start">
        <div class=" flex flex-row items-center gap-2">
          <a
            href="/bank"
            class="text-black  font-semibold px-3 py-1 -ml-3 rounded hover:bg-gray-100 block"
          >
            Bank
          </a>
          <span class="text-gray-300 font-light">/</span>
          <Dropdown>
            <button
              class="px-3 py-1 flex flex-row gap-2  items-center hover:bg-gray-100 rounded-sm cursor-pointer"
              type="button"
            >
              All companies <ChevronsUpDown size="12" />
            </button>
            <DropdownMenu>
              <DropdownItem href="bank/all" id="bank-all">
                All
              </DropdownItem>
              <DropdownItem href="bank/company-a" id="bank-company-a">
                Company A
              </DropdownItem>
              <DropdownItem href="bank/company-b" id="bank-company-a">
                Company B
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {navObject.breadCrump && (
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

function buildNavigation(section: string, item?: string) {
  return {
    breadCrump: buildBreadCrump(section, item),
    tabNav: buildTabNav(section, item),
  };
}

function buildBreadCrump(section: string, item?: string) {
  // If we do not have an item, we are in an overview
  if (!item) {
    return {
      section: sectionTitles[section as keyof typeof sectionTitles],
      title: undefined,
      href: `/bank/${section}`,
    };
  }
  // If we have an item, we are in a detail view
  return {
    section: sectionTitles[section as keyof typeof sectionTitles],
    title: item,
    href: `/bank/${section}`,
  };
}

function buildTabNav(section: string, itemLabel?: string) {
  if (!itemLabel) {
    return categoryNav[section as keyof typeof categoryNav];
  }

  return detailNav[section as keyof typeof detailNav].map((item) => ({
    ...item,
    href: item.href.replace("*", itemLabel ?? ""),
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
    href: "/bank",
  },
  {
    name: "Accounts",
    href: "/bank/accounts",
  },
  {
    name: "Transactions",
    href: "/bank/transactions",
  },
] as const;

const accounts = [
  {
    name: "Balances",
    href: "/bank/accounts",
  },
] as const;

const accountDetails = [
  {
    name: "Overview",
    href: "/bank/accounts/1",
  },
  {
    name: "Transactions",
    href: "/bank/accounts/1/transactions",
  },
  { name: "Statements", href: "/bank/accounts/1/statements" },
] as const;

const transactions = [
  {
    name: "All",
    href: "/bank/transactions",
  },
  {
    name: "Outgoing",
    href: "/bank/transactions/outgoing",
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
