import { eq } from "drizzle-orm";
import { usersTable } from "@/infrastructure/database/schemas/user.schema";
import IUserRepository from "@/application/repositories/user.repository.interface";
import db from "@/infrastructure/database";

export default class UserRepository implements IUserRepository {
  async createUser(user: {
    email: string;
    password: string;
    name: string;
    role?: "admin" | "user";
    status?: "active" | "inactive";
  }): Promise<{
    id: number;
    email: string;
    name: string;
    role: "admin" | "user";
    status: "active" | "inactive";
    createdAt: Date;
    updatedAt: Date;
  }> {
    const newUser = await db
      .insert(usersTable)
      .values({
        email: user.email,
        password: user.password,
        name: user.name,
        role: user.role || "user",
        status: user.status || "active",
      })
      .returning();

    return newUser[0];
  }

  async findUserByEmail(email: string): Promise<{
    id: number;
    email: string;
    password: string;
    name: string;
    role: "admin" | "user";
    status: "active" | "inactive";
    createdAt: Date;
    updatedAt: Date;
  } | null> {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    return user[0] || null;
  }

  async findUserById(id: number): Promise<{
    id: number;
    email: string;
    password: string;
    name: string;
    role: "admin" | "user";
    status: "active" | "inactive";
    createdAt: Date;
    updatedAt: Date;
  } | null> {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));
    return user[0] || null;
  }
}
