import { Context } from "fresh";
import { State } from "./utils.ts";

export function extractNavigation(ctx: Context<State>) {
  const item = ctx.url.pathname.split("/")[4] ?? undefined;
  const urlSection = ctx.url.pathname.split("/")[3] ?? "bank";
  const company = ctx.url.pathname.split("/")[2] ?? "all";
  return {
    item,
    urlSection,
    company,
  };
}
