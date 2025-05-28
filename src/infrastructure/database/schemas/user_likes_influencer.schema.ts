import { pgTable, integer, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./user.schema";
import { influencersTable } from "./influencer.schema";

export const userLikesInfluencerTable = pgTable(
  "user_likes_influencer",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    influencerId: integer("influencer_id")
      .notNull()
      .references(() => influencersTable.id, { onDelete: "cascade" }),
    likedAt: timestamp("liked_at").defaultNow(),
  },
  (t) => ({
    pk: [t.userId, t.influencerId],
  })
);
