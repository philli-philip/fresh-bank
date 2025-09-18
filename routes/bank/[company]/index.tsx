import { Context } from "fresh";
import DayRecap from "../../../components/bank/dashboard/dayRecap.tsx";
import { State } from "@/utils/utils.ts";
import { Head } from "fresh/runtime";
import { db } from "../../../services/db.ts";

export default function Index(ctx: Context<State>) {
  const company = ctx.params.company;
  const { companyName } = db.prepare(`
    SELECT
      name as companyName
    FROM companies
    WHERE slug is ?
    `).get(company) as unknown as { companyName: string };

  return (
    <div>
      <Head>
        <title>
          {company === "all" ? "Dashboard" : `Dashboard – ${companyName}`}
        </title>
      </Head>
      <h1 class="text-2xl font-medium pt-4 pb-6">Dashboard</h1>
      <main class="grid-cols-3 grid">
        <DayRecap company={company} />
      </main>
    </div>
  );
}
