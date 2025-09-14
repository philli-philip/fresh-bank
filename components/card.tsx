import { ComponentChildren } from "preact";
import { cn } from "../utils/utils.ts";

export function Card(
  { children, className }: { children?: ComponentChildren; className?: string },
) {
  return (
    <div class={cn("bg-white border border-gray-200 rounded-lg", className)}>
      {children}
    </div>
  );
}
