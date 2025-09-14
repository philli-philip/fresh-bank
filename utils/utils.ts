import { createDefine } from "fresh";
import clsx, { type ClassValue } from "npm:clsx";
import { twMerge } from "npm:tailwind-merge";

// This specifies the type of "ctx.state" which is used to share
// data among middlewares, layouts and routes.
export interface State {
  shared: string;
}

export const define = createDefine<State>();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
