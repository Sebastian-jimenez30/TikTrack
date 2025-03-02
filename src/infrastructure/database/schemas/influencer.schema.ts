import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const influencersTable = pgTable("influencers", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  username: varchar("username", { length: 100 }).unique().notNull(),
  profileName: varchar("profile_name", { length: 180 }).notNull(),
  profilePicture: varchar("profile_picture", { length: 350 }).notNull(),
  profileUrl: varchar("profile_url", { length: 350 }).notNull(),
  profileDescription: varchar("profile_description", { length: 255 }).notNull(),
  totalLikes: integer("total_likes").notNull(),
  totalComments: integer("total_comments").notNull(),
  totalShares: integer("total_shares").notNull(),
  totalSaves: integer("total_saves").notNull(),
  totalViews: integer("total_views").notNull(),
  totalFollowers: integer("total_followers").notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
