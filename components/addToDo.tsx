import { Button } from "./Button.tsx";

export default function AddTodoForm() {
  return (
    <form
      action="/api/todos/create"
      method="POST"
      class="border border-gray-200 bg-white shadow-2xl shadow-black/10 rounded-sm flex flex-row hover:bg-gray-100"
    >
      <input
        type="text"
        name="title"
        minLength={4}
        placeholder="Add a new todo"
        class="w-full p-3 user-invalid:border-red-600"
        required
        autoComplete="off"
        data-lpignore="true"
      />
      <Button type="submit" class="m-1">
        Add
      </Button>
    </form>
  );
}
