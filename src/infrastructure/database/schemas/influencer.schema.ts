import {
  integer,
  pgTable,
  varchar,
  timestamp,
  json,
} from "drizzle-orm/pg-core";

export const influencersTable = pgTable("influencers", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  username: varchar("username", { length: 100 }).unique().notNull(),
  profileName: varchar("profile_name", { length: 180 }).notNull(),
  profilePicture: varchar("profile_picture", { length: 350 }).notNull(),
  profileUrl: varchar("profile_url", { length: 350 }).notNull(),
  averageLikes: integer("average_likes").notNull(),
  averageComments: integer("average_comments").notNull(),
  averageShares: integer("average_shares").notNull(),
  averageSaves: integer("average_saves").notNull(),
  averageViews: integer("average_views").notNull(),
  followers: integer("followers").notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  featuredVideos: json("featured_videos").$type<string[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
