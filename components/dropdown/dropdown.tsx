import { ComponentChildren } from "preact";
import { cn } from "../../utils/utils.ts";

export function Dropdown({ children }: { children: ComponentChildren }) {
  return (
    <div class="relative inline-block text-left group">
      {children}
    </div>
  );
}

export function DropdownMenu(
  { children, position = "left" }: {
    children: ComponentChildren;
    position?: "left" | "right";
  },
) {
  return (
    <div
      class={cn(
        "absolute py-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-gray-200 ring-opacity-5 focus:outline-none opacity-0 invisible scale-y-0 transform origin-top transition-all duration-200 ease-in-out z-10 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:scale-y-100",
        position === "left" ? "left-0" : "right-0",
      )}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex={-1}
    >
      {children}
    </div>
  );
}

export function DropdownItem({ children }: { children: ComponentChildren }) {
  return (
    <div class="block" role="none">
      {children}
    </div>
  );
}

export function DropdownItemLink({
  children,
  href,
}: {
  children: ComponentChildren;
  href: string;
}) {
  return (
    <div class="block" role="none">
      <a
        href={href}
        class="text-gray-700 block px-4 py-2 hover:bg-gray-100"
        role="menuitem"
      >
        {children}
      </a>
    </div>
  );
}

export function DropdownItemDivider() {
  return <div class="my-1 h-[1px] bg-gray-200" />;
}
