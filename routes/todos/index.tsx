import AddTodoForm from "../../components/addToDo.tsx";
import TodoList from "../../components/todoList.tsx";
import { getTodos } from "../../services/todos.ts";

export default function ToDoView() {
  const todos = getTodos();
  return (
    <html>
      <head>
        <title>To dos</title>
        <script
          src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.7/dist/htmx.js"
          integrity="sha384-yWakaGAFicqusuwOYEmoRjLNOC+6OFsdmwC2lbGQaRELtuVEqNzt11c2J711DeCZ"
          crossorigin="anonymous"
        >
        </script>
      </head>
      <main class="mx-auto max-w-xl pt-10">
        <h1 class="text-2xl font-bold pb-4">Todos</h1>
        <AddTodoForm />
        <TodoList todos={todos} />
      </main>
    </html>
  );
}
