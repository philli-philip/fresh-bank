import { Context } from "fresh";
import { State } from "@/utils/utils.ts";
import { Navigation } from "@/components/bank/navigation.tsx";

export default function Layout(ctx: Context<State>) {
  return (
    <>
      <Navigation ctx={ctx} />
      <main class="container px-4 mx-auto">
        <ctx.Component />
      </main>
    </>
  );
}
