import { Context } from "fresh";
import { Navigation } from "../../components/bank/navigation.tsx";
import { State } from "../../utils/utils.ts";

export default function Layout(ctx: Context<State>) {
  return (
    <>
      <Navigation ctx={ctx} />
      <main class="container px-4 mx-auto pt-3">
        <ctx.Component />
      </main>
    </>
  );
}
