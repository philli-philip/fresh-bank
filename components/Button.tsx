import type { ComponentChildren } from "preact";
import { cn } from "../utils/utils.ts";

export interface ButtonProps {
  id?: string;
  onClick?: () => void;
  children?: ComponentChildren;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  class?: string;
}

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      type={props.type || "button"}
      class={cn(
        "button-secondary px-2 py-1 cursor-pointer bg-cyan-600 hover:bg-cyan-500 text-white rounded-sm transition-colors",
        props.class,
      )}
    />
  );
}
