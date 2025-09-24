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
      class={cn(
        "grow flex flex-col items-center justify-center",
        className,
      )}
    >
      <div class="flex flex-col items-start">
        <p class="font-semibold text-lg">{title}</p>
        <p class="pb-4 text-gray-700">{subline}</p>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
