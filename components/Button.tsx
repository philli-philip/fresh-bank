import type { ComponentChildren } from "preact";
import { cn } from "../utils/utils.ts";

export interface ButtonProps {
  id?: string;
  onClick?: () => void;
  children?: ComponentChildren;
  form?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  class?: string;
  size?: keyof typeof sizes;
  style?: keyof typeof styles;
}

const sizes = {
  small: "px-2 py-1 gap-2 rounded-xs",
  medium: "px-4 py-2 gap-3 rounded-xs",
  large: "px-6 py-3 gap-4 rounded-sm",
};

const styles = {
  primary: "bg-blue-700 hover:bg-blue-900 text-white",
  red: "bg-red-600 hover:bg-red-900 text-white",
  ghost: "bg-blue-50 hover:bg-blue-900 text-blue-900 hover:text-white",
  outline:
    "border border-blue-700 text-blue-700 hover:bg-blue-900 hover:text-white hover:border-blue-900",
  link: "bg-transparent text-blue-700 hover:bg-blue-900 hover:text-white  ",
};

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      type={props.type || "button"}
      class={cn(
        "button-secondary flex flex-row gap-2 items-center cursor-pointer duration-100 transition-colors",
        props.class,
        sizes[props.size ?? "medium"],
        styles[props.style ?? "primary"],
      )}
    />
  );
}

interface LinkProps {
  id?: string;
  href?: string;
  children?: ComponentChildren;
  disabled?: boolean;
  class?: string;
  size?: keyof typeof sizes;
  style?: keyof typeof styles;
}

export function LinkButton(props: LinkProps) {
  return (
    <a
      {...props}
      href={props.href}
      class={cn(
        "button-secondary flex flex-row gap-2 items-center cursor-pointer duration-100 transition-colors",
        props.class,
        sizes[props.size ?? "medium"],
        styles[props.style ?? "primary"],
      )}
    >
      {props.children}
    </a>
  );
}
