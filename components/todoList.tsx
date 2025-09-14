import { Todo } from "../utils/types.ts";
import { Check, Circle, Trash } from "lucide-preact";
import { cn } from "../utils/utils.ts";
import Message from "./message.tsx";

export default function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <div class="pt-8">
      {todos.length === 0 && <Message title="No todos" />}
      {todos.length > 0 && (
        <ul class="border rounded border-gray-200 shadow-2xl shadow-black/10">
          {todos.map((todo) => <ToDo todo={todo} key={todo.id} />)}
        </ul>
      )}
    </div>
  );
}

const ToDo = ({ todo }: { todo: Todo }) => (
  <li
    data-completed={todo.completed ? "completed" : "open"}
    class="group flex flex-row data-[completed=completed]:line-through data-[completed=completed]:text-gray-600 items-start gap-3 p-3 not-last:border-b transition-colors border-gray-200"
  >
    <form
      action={`/api/todos/toggle`}
      method="POST"
      class="size-8"
    >
      <input type="hidden" name="id" value={todo.id} />
      <input
        type="checkbox"
        hidden
        name="completed"
        checked={todo.completed ? false : true}
      />
      <button type="submit" class="cursor-pointer size-8">
        <Check
          size="32"
          class={cn(
            "p-1.5 rounded-md hover:bg-gray-100 text-green-600",
            todo.completed ? "block" : "hidden",
          )}
        />
        <Circle
          size="32"
          class={cn(
            "p-2 rounded-md hover:bg-gray-100",
            !todo.completed ? "block" : "hidden",
          )}
        />
      </button>
    </form>
    <span class="flex-1 pt-1">{todo.title}</span>
    <form action={`/api/todos/delete`} method="POST">
      <input type="hidden" name="id" value={todo.id} />
      <button
        type="submit"
        class="p-2 hover:bg-red-100 rounded-md hidden group-hover:block cursor-pointer"
      >
        <Trash size="16" class="text-red-600" />
      </button>
    </form>
    <button
      hx-post={`/api/todos/delete`}
      name="id"
      value={todo.id}
      type="button"
      hx-swap="outerHTML"
      hx-target="closest li"
    >
      Delete HTMX
    </button>
  </li>
);
