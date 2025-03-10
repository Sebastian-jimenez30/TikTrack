import { pgTable, integer, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["admin", "user"]);

export const userStatusEnum = pgEnum("user_status", ["active", "inactive"]);

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().notNull().generatedAlwaysAsIdentity(), 
  email: varchar("email", { length: 255 }).unique().notNull(), 
  password: varchar("password", { length: 255 }).notNull(), 
  name: varchar("name", { length: 255 }).notNull(), 
  role: userRoleEnum("role").default("user").notNull(), 
  status: userStatusEnum("status").default("inactive").notNull(), 
  createdAt: timestamp("created_at").defaultNow().notNull(), 
  updatedAt: timestamp("updated_at").defaultNow().notNull(), 
});