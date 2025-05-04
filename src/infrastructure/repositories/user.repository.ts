import { eq } from "drizzle-orm";
import { usersTable } from "@/infrastructure/database/schemas/user.schema";
import IUserRepository from "@/application/repositories/user.repository.interface";
import db from "@/infrastructure/database";
import { count } from "drizzle-orm";

export default class UserRepository implements IUserRepository {
  async listPaginated(
    pageNumber: number,
    limit: number
  ): Promise<
    {
      id: number;
      email: string;
      password: string;
      name: string;
      role: "admin" | "user";
      status: "active" | "inactive";
      createdAt: Date;
      updatedAt: Date;
    }[]
  > {
    const offset = (pageNumber - 1) * limit;
    const response = await db
      .select()
      .from(usersTable)
      .limit(limit)
      .offset(offset);
    return response;
  }

  async count(): Promise<number> {
    const response = await db.select({ count: count() }).from(usersTable);
    return response[0].count;
  }

  async create(user: {
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

  async findByEmail(email: string): Promise<{
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

  async findById(id: number): Promise<{
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

  async update(
    id: number,
    user: {
      name?: string;
      email?: string;
      password?: string;
      role?: "admin" | "user";
      status?: "active" | "inactive";
    }
  ): Promise<{
    id: number;
    email: string;
    name: string;
    role: "admin" | "user";
    status: "active" | "inactive";
    createdAt: Date;
    updatedAt: Date;
  }> {
    const updatedUser = await db
      .update(usersTable)
      .set({
        ...(user.name && { name: user.name }),
        ...(user.email && { email: user.email }),
        ...(user.password && { password: user.password }),
        ...(user.role && { role: user.role }),
        ...(user.status && { status: user.status }),
      })
      .where(eq(usersTable.id, id))
      .returning();

    return updatedUser[0];
  }
}
