import { App, Context, staticFiles, trailingSlashes } from "fresh";
import { type State } from "./utils/utils.ts";
import { addTodo, deleteTodo, toggleTodo } from "./services/todos.ts";
import { createTransaction, getTransaction } from "./services/transactions.ts";
import Message from "./components/message.tsx";
import { generateQuickHash } from "./utils/hash.ts";
import { createResponse, Session } from "@mwid/better-sse";
import { renderToString } from "npm:preact-render-to-string";
import { Transaction } from "./components/bank/transactionList.tsx";
import { probability } from "./utils/random.ts";

export const app = new App<State>();
let sseSession: Session | undefined = undefined;

console.log("Debugging set to:", Deno.env.get("IS_DEV"));

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

app.get("/api/sse", (ctx: Context<State>) => {
  return createResponse(ctx.req, {
    serializer: (e) => e as string,
  }, (session) => {
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
  if (probability(0.1)) {
    try {
      const transaction = {
        amount: (Math.random() * 100000).toString(),
        hash: generateQuickHash(12),
        currency: "USD" as const,
        date: new Date().toISOString(),
        credit_account_bank: (Math.random() > 0.5 ? "FRESH" : "other") as
          | "FRESH"
          | "other",
        debit_account_bank: (Math.random() > 0.5 ? "FRESH" : "other") as
          | "FRESH"
          | "other",
        credit_account_id: 1,
        debit_account_id: 2,
      };
      const transID = createTransaction(transaction);
      const newTransaction = getTransaction({
        id: Number(transID.lastInsertRowid),
      });
      if (newTransaction && sseSession) {
        sseSession.push(renderToString(
          <div class="animate-new">
            <Transaction
              transaction={{
                ...newTransaction,
              }}
            />
          </div>,
        ));
      }
    } catch (error) {
      console.log("create transaction error: ", error);
    }
  }
}, 1000 * 60);
