import { App, Context, staticFiles } from "fresh";
import { type State } from "./utils/utils.ts";
import { addTodo, deleteTodo, toggleTodo } from "./services/todos.ts";
import { createTransaction } from "./services/transactions.ts";
import Message from "./components/message.tsx";

export const app = new App<State>();

app.post("/api/todos/toggle", async (ctx: Context<State>) => {
  const form = await ctx.req.formData();
  const id = form.get("id")?.toString();
  toggleTodo(Number(id));
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/todos",
    },
  });
});

app.notFound((ctx: Context<State>) => {
  return ctx.render(<Message title="404" subline="Page not found" />, {
    status: 404,
  });
});

app.post("/api/todos/create", async (ctx: Context<State>) => {
  const title = (await ctx.req.formData()).get("title")?.toString();
  if (!title) {
    return new Response("Title is required", { status: 400 });
  }
  addTodo(title);
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/todos",
    },
  });
});

app.post("/api/todos/delete", async (ctx: Context<State>) => {
  const id = (await ctx.req.formData()).get("id")?.toString();
  console.log("delete: ", id);
  deleteTodo(Number(id));
  return new Response(null, {
    status: 200,
  });
});

// Pass a shared value from a middleware
app.use(async (ctx) => {
  ctx.state.shared = "hello";
  return await ctx.next();
});

// this is the same as the /api/:name route defined via a file. feel free to delete this!
app.get("/api/:name", (ctx: Context<State>) => {
  const name = ctx.params.name;
  return new Response(
    `Hello, ${name.charAt(0).toUpperCase() + name.slice(1)}!`,
  );
});

app.use(staticFiles());
// Include file-system based routes here
app.fsRoutes();

setInterval(() => {
  // Generate a random number between 0 and 1
  const randomNumber = Math.random();

  // 0.1% chance is 0.001
  const probability = 0.5;

  // If the random number is less than the probability, log the message
  if (randomNumber < probability) {
    try {
      const transaction = createTransaction({
        amount: (Math.random() * 100000).toString(),
        currency: "USD",
        date: new Date().toISOString(),
        credit_account_bank: (Math.random() > 0.5 ? "FRESH" : "other"),
        debit_account_bank: (Math.random() > 0.5 ? "FRESH" : "other"),
        credit_account_id: 1,
        debit_account_id: 2,
      });
      console.log("create transaction: ", transaction.lastInsertRowid);
    } catch (error) {
      console.log("create transaction error: ", error);
    }
  }
}, 1000 * 60 * 5);
