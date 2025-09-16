import { App, Context, staticFiles, trailingSlashes } from "fresh";
import { type State } from "./utils/utils.ts";
import { addTodo, deleteTodo, toggleTodo } from "./services/todos.ts";
import { createTransaction } from "./services/transactions.ts";
import Message from "./components/message.tsx";
import { generateQuickHash } from "./utils/hash.ts";
import { createResponse, Session } from "@mwid/better-sse";
import { X } from "lucide-preact";
import { renderToString } from "npm:preact-render-to-string";

export const app = new App<State>();
let sseSession: Session | undefined = undefined;

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

app.get("/api/sse", async (ctx: Context<State>) => {
  return await createResponse(ctx.req, (session) => {
    sseSession = session;
  });
});

app.post("/api/todos/delete", async (ctx: Context<State>) => {
  const id = (await ctx.req.formData()).get("id")?.toString();
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

app.use(staticFiles());
app.use(trailingSlashes("never"));
app.fsRoutes();

setInterval(() => {
  // Generate a random number between 0 and 1
  const randomNumber = Math.random();

  // 0.1% chance is 0.001
  const probability = 1;

  // If the random number is less than the probability, log the message
  if (randomNumber < probability) {
    try {
      const transaction = createTransaction({
        amount: (Math.random() * 100000).toString(),
        hash: generateQuickHash(12),
        currency: "USD",
        date: new Date().toISOString(),
        credit_account_bank: (Math.random() > 0.5 ? "FRESH" : "other"),
        debit_account_bank: (Math.random() > 0.5 ? "FRESH" : "other"),
        credit_account_id: 1,
        debit_account_id: 2,
      });
      if (!sseSession) {
        console.error("no active session");
        return;
      }
      const html = (
        <div class="fixed bottom-4 right-4 z-50 animate-toast px-4 py-3 rounded-md shadow-lg border border-gray-200 shadow-2xl text-black">
          <div class="flex items-center space-x-2">
            <span>Transaction created</span>
            <X />
          </div>
        </div>
      );
      sseSession.push(renderToString(html));
      console.log("create transaction: ", transaction.lastInsertRowid);
    } catch (error) {
      console.log("create transaction error: ", error);
    }
  }
}, 1000 * 60);
