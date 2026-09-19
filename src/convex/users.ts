import { getAuthUserId } from "@convex-dev/auth/server";
import { crud } from "convex-helpers/server/crud";

import { query } from "./_generated/server";
import schema from "./schema";

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});

export const { create, read, update, destroy } = crud(schema, "users");