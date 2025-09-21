import { Context } from "fresh";
import { State } from "@/utils/utils.ts";
import { X } from "lucide-preact";
import { Partial } from "fresh/runtime";

export default function Layout(ctx: Context<State>) {
  return (
    <>
      <nav
        class="border-gray-200 border-b flex flex-row justify-between px-3 py-2 items-center"
        f-client-nav
      >
        <Partial name="form-title">
          <p>Title of the form</p>
        </Partial>
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
