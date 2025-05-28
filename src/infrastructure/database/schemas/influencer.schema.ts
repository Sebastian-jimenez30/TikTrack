import {
  integer,
  doublePrecision,
  pgTable,
  varchar,
  timestamp,
  json,
  pgEnum,
} from "drizzle-orm/pg-core";

export const influencerStatusEnum = pgEnum("influencer_status", [
  "active",
  "inactive",
  "reported",
]);

export const influencersTable = pgTable("influencers", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  username: varchar("username", { length: 100 }).unique().notNull(),
  profileName: varchar("profile_name", { length: 180 }).notNull(),
  profilePicture: varchar("profile_picture", { length: 350 }).notNull(),
  profileUrl: varchar("profile_url", { length: 350 }).notNull(),
  averageLikes: doublePrecision("average_likes").notNull(),
  averageComments: doublePrecision("average_comments").notNull(),
  averageShares: doublePrecision("average_shares").notNull(),
  averageSaves: doublePrecision("average_saves").notNull(),
  averageViews: doublePrecision("average_views").notNull(),
  followers: integer("followers").notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  featuredVideos: json("featured_videos").$type<string[]>().notNull(),
  status: influencerStatusEnum("status").default("active").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
