import { Todo } from "../utils/types.ts";
import { db } from "./db.ts";

export function getTodos() {
  return db.prepare("SELECT * FROM tasks").all() as unknown as Todo[];
}

export function addTodo(title: string) {
  return db
    .prepare("INSERT INTO tasks (title, completed) VALUES (?, ?)")
    .run(title, 0);
}

export function deleteTodo(id: number) {
  return db.prepare("DELETE FROM tasks WHERE id = ?").run(id);
}

export function updateTodo(id: number, title: string, completed: boolean) {
  const bool = completed ? 1 : 0;
  return db
    .prepare("UPDATE tasks SET title = ?, completed = ? WHERE id = ?")
    .run(title, bool, id);
}

export function toggleTodo(id: number) {
  return db
    .prepare("UPDATE tasks SET completed = NOT completed WHERE id = ?")
    .run(id);
}
