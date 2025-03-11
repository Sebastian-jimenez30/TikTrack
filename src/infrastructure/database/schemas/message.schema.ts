import {
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const messagesTable = pgTable("messages", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  sender_id: integer("sender_id").notNull(),
  receiver_id: integer("receiver_id").notNull(),
  content: text("content").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
}); 