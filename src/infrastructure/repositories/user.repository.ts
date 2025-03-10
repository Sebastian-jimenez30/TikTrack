// src/infrastructure/repositories/user.repository.ts
import { eq, count } from "drizzle-orm";
import { usersTable } from "@/infrastructure/database/schemas/user.schema";
import IUserRepository from "@/application/repositories/user.repository.interface";
import db from "@/infrastructure/database";
import { hash } from "bcrypt";

export default class UserRepository implements IUserRepository {
  // Crear un nuevo usuario
  async createUser(user: {
    email: string;
    password: string;
    name: string;
    role?: "admin" | "user";
    status?: "active" | "inactive";
  }): Promise<{
    id: number;
    email: string;
    password: string; // Asegurar que devuelva el campo password
    name: string;
    role: "admin" | "user";
    status: "active" | "inactive";
    createdAt: Date;
    updatedAt: Date;
  }> {
    const hashedPassword = await hash(user.password, 10); // Hashear la contraseña
    const newUser = await db
      .insert(usersTable)
      .values({
        email: user.email,
        password: hashedPassword,
        name: user.name,
        role: user.role || "user", // Valor por defecto: "user"
        status: user.status || "inactive", // Valor por defecto: "inactive"
      })
      .returning();
    return newUser[0];
  }

  // Obtener un usuario por ID
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
    const user = await db.select().from(usersTable).where(eq(usersTable.id, id));
    return user[0] || null;
  }

  // Obtener un usuario por email
  async findUserByEmail(email: string): Promise<{
    id: number;
    email: string;
    password: string; // Asegurar que devuelva el campo password
    name: string;
    role: "admin" | "user";
    status: "active" | "inactive";
    createdAt: Date;
    updatedAt: Date;
  } | null> {
    const user = await db.select().from(usersTable).where(eq(usersTable.email, email));
    return user[0] || null;
  }

  // Actualizar un usuario
  async updateUser(
    id: number,
    data: Partial<{
    email: string;
    password: string;
    name: string;
    role: "admin" | "user";
    status: "active" | "inactive";
    }>
  ): Promise<{
    id: number;
    email: string;
    password: string; // Asegurar que devuelva el campo password
    name: string;
    role: "admin" | "user";
    status: "active" | "inactive";
    createdAt: Date;
    updatedAt: Date;
  }> {
    const updatedUser = await db
      .update(usersTable)
      .set(data)
      .where(eq(usersTable.id, id))
      .returning();
    return updatedUser[0];
  }

  // Eliminar un usuario
  async deleteUser(id: number): Promise<boolean> {
    const deletedUser = await db.delete(usersTable).where(eq(usersTable.id, id)).returning();
    return deletedUser.length > 0;
  }

  // Listar usuarios (paginado)
  async listUsers(page: number, limit: number): Promise<{
    users: {
    id: number;
    email: string;
    password: string; // Asegurar que devuelva el campo password
    name: string;
    role: "admin" | "user";
    status: "active" | "inactive";
    createdAt: Date;
    updatedAt: Date;
    }[];
    total: number;
  }> {
    const offset = (page - 1) * limit;
    const users = await db.select().from(usersTable).limit(limit).offset(offset);
    const total = await db.select({ count: count() }).from(usersTable);
    return { users, total: total[0].count };
  }

  // Actualizar el rol de un usuario
  async updateUserRole(
    id: number,
    role: "admin" | "user"
  ): Promise<{
    id: number;
    email: string;
    password: string; // Asegurar que devuelva el campo password
    name: string;
    role: "admin" | "user";
    status: "active" | "inactive";
    createdAt: Date;
    updatedAt: Date;
  }> {
    const updatedUser = await db
      .update(usersTable)
      .set({ role })
      .where(eq(usersTable.id, id))
      .returning();
    return updatedUser[0];
  }

  // Actualizar el estado de un usuario
  async updateUserStatus(
    id: number,
    status: "active" | "inactive"
  ): Promise<{
    id: number;
    email: string;
    password: string; // Asegurar que devuelva el campo password
    name: string;
    role: "admin" | "user";
    status: "active" | "inactive";
    createdAt: Date;
    updatedAt: Date;
  }> {
    const updatedUser = await db
      .update(usersTable)
      .set({ status })
      .where(eq(usersTable.id, id))
      .returning();
    return updatedUser[0];
  }

  // Actualizar el perfil de un usuario
  async updateProfile(
    id: number,
    data: Partial<{
      email: string;
      password: string;
      name: string;
    }>
  ): Promise<{
    id: number;
    email: string;
    password: string; // Asegurar que devuelva el campo password
    name: string;
    role: "admin" | "user";
    status: "active" | "inactive";
    createdAt: Date;
    updatedAt: Date;
  }> {
    const updatedUser = await db
      .update(usersTable)
      .set(data)
      .where(eq(usersTable.id, id))
      .returning();
    return updatedUser[0];
  }

  // Obtener el perfil de un usuario
  async getProfile(id: number): Promise<{
    id: number;
    email: string;
    password: string; // Asegurar que devuelva el campo password
    name: string;
    role: "admin" | "user";
    status: "active" | "inactive";
    createdAt: Date;
    updatedAt: Date;
  } | null> {
    const user = await db.select().from(usersTable).where(eq(usersTable.id, id));
    return user[0] || null;
  }
}