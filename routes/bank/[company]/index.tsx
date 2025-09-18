import { Context } from "fresh";
import DayRecap from "../../../components/bank/dashboard/dayRecap.tsx";
import { State } from "@/utils/utils.ts";

export default function Index(ctx: Context<State>) {
  const company = ctx.params.company;
  return (
    <div>
      <h1 class="text-2xl font-medium pt-4 pb-6">Dashboard</h1>
      <main class="grid-cols-3 grid">
        <DayRecap company={company} />
      </main>
    </div>
  );
}
