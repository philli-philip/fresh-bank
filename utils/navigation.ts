import { Context } from "fresh";
import { State } from "./utils.ts";

export function extractNavigation(ctx: Context<State>) {
  const item = ctx.params.id ?? undefined;
  const urlSection = ctx.url.pathname.split("/")[3] ?? "bank";
  const company = ctx.params.company ?? "all";
  return {
    item,
    urlSection,
    company,
  };
}
