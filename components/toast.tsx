import { ComponentChildren } from "preact";
import { cn } from "../utils/utils.ts";

export default function Toast({
  style = "success",
  message = "Some text",
  action,
}: {
  style?: "success" | "error" | "black";
  message?: string;
  action?: ComponentChildren;
}) {
  const styles = {
    success: "bg-green-900 text-white",
    error: "bg-red-900 text-white",
    black: "bg-gray-900 text-white",
  };

  return (
    <div
      hx-swap="delete"
      hx-target="this"
      hx-get=""
      hx-trigger="load delay:50s"
      class={cn(
        "rounded-sm animate-toast px-4 py-3 flex justify-between items-center shadow-2xl flex-row gap-4 min-w-3xs",
        styles[style],
      )}
    >
      <span>
        {message}
      </span>
      {action}
    </div>
  );
}
