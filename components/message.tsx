import { ComponentChildren } from "preact";
import { cn } from "../utils/utils.ts";

export default function Message(
  { title, subline, children, className }: {
    title?: string;
    subline?: string;
    children?: ComponentChildren;
    className?: string;
  },
) {
  return (
    <div
      class={cn("grow flex flex-col items-center justify-center", className)}
    >
      <h3>{title}</h3>
      <p>{subline}</p>
      <div>
        {children}
      </div>
    </div>
  );
}
