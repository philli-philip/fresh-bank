import { Context } from "fresh";
import { State } from "@/utils/utils.ts";
import { X } from "lucide-preact";

export default function Layout(ctx: Context<State>) {
  return (
    <>
      <nav
        class=" flex flex-row justify-start px-3 py-2 items-center"
        f-client-nav
      >
        <a
          href="/bank/all/"
          class="p-1 rounded-sm hover:bg-gray-200 duration-75"
        >
          <X size="24" />
        </a>
      </nav>
      <main class="container px-4 mx-auto pt-3">
        <ctx.Component />
      </main>
    </>
  );
}
