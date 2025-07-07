import { posts } from "@/server/db/schema";
import { desc } from "drizzle-orm";
import { z } from "zod";
import { j, publicProcedure } from "../jstack";

async function messageRoom(room: string, message: string) {
  console.log(`Message to ${room}: ${message}`);
}

export const facebookRouter = j.router({
  check: publicProcedure.get(async ({ c, ctx }) => {
    const mode = c.req.query("hub.mode");
    const verifyToken = c.req.query("hub.verify_token");
    const challenge = c.req.query("hub.challenge");

    const { db } = ctx;

    if (mode === "subscribe" && verifyToken === "token") {
      // save to the database if needed
      await db.insert(posts).values({ name: "Facebook Webhook Verified" });
      return c.text(challenge || "");
    }
    return c.text("Forbidden", 400);
  }),
});
