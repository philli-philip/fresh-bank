import type { ComponentChildren } from "preact";
import { cn } from "../utils/utils.ts";

export interface ButtonProps {
  id?: string;
  onClick?: () => void;
  children?: ComponentChildren;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  class?: string;
  size?: "small" | "medium" | "large";
}

const sizes = {
  small: "px-2 py-1 gap-2 rounded-xs",
  medium: "px-4 py-2 gap-3 rounded-xs",
  large: "px-6 py-3 gap-4 rounded-sm",
};

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      type={props.type || "button"}
      class={cn(
        "button-secondary flex flex-row gap-2 items-center px-2 py-1 cursor-pointer bg-blue-900 hover:bg-blue-800 duration-100 text-white transition-colors",
        props.class,
        sizes[props.size ?? "medium"],
      )}
    />
  );
}
