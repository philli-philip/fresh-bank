import { Context } from "fresh";
import { createResponse, Session } from "@mwid/better-sse";
import { renderToString } from "npm:preact-render-to-string";
import { VNode } from "preact";
import { State } from "./utils.ts";

// Change sseSession to a Map to store sessions per customer ID
const sseSessions = new Map<string, Session>();

export function createSseResponse(ctx: Context<State>) {
  return createResponse(
    ctx.req,
    {
      serializer: (e) => e as string,
    },
    (session) => {
      // Hardcode customer ID to '1' for now
      const customerId = "1";
      sseSessions.set(customerId, session);
      // Remove session when connection closes
      session.on("close", () => {
        sseSessions.delete(customerId);
      });
    },
  );
}

export function getSession(customerId: string = "1") {
  return sseSessions.get(customerId);
}

export function push(data: string, event: string, customerId: string = "1") {
  const session = sseSessions.get(customerId);
  if (session) {
    try {
      session.push(data, event);
    } catch (error) {
      console.warn(
        `Failed to push SSE event '${event}' to customer '${customerId}':`,
        error,
      );
      // Optionally, remove the session if it's no longer active
      sseSessions.delete(customerId);
    }
  }
}

export function pushHtml(
  data: VNode,
  event: string,
  customerId: string = "1",
) {
  const session = sseSessions.get(customerId);
  if (session) {
    try {
      session.push(renderToString(data), event);
    } catch (error) {
      console.warn(
        `Failed to push HTML SSE event '${event}' to customer '${customerId}':`,
        error,
      );
      // Optionally, remove the session if it's no longer active
      sseSessions.delete(customerId);
    }
  }
}
