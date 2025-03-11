// src/infrastructure/repositories/user.repository.ts
import { eq } from "drizzle-orm";
import { usersTable } from "@/infrastructure/database/schemas/user.schema";
import IUserRepository from "@/application/repositories/user.repository.interface";
import db from "@/infrastructure/database";

export default class UserRepository implements IUserRepository {
  // Crear un nuevo usuario (registro)
  async createUser(user: {
    email: string;
    password: string;
    name: string;
    role?: "admin" | "user"; // Asegúrate de que el tipo sea correcto
    status?: "active" | "inactive"; // Asegúrate de que el tipo sea correcto
  }): Promise<{
    id: number;
    email: string;
    name: string;
    role: "admin" | "user";
    status: "active" | "inactive";
    createdAt: Date;
    updatedAt: Date;
  }> {

    // Asegúrate de que los valores coincidan con los tipos del esquema
    const newUser = await db
      .insert(usersTable)
      .values({
        email: user.email, // string
        password: user.password, // string
        name: user.name, // string
        role: user.role || "user", // "admin" | "user"
        status: user.status || "active", // "active" | "inactive"
      })
      .returning();

    return newUser[0];
  }

  // Obtener un usuario por ID (para ver el perfil)
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

  // Obtener un usuario por email (para el inicio de sesión)
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
    const user = await db.select().from(usersTable).where(eq(usersTable.email, email));
    return user[0] || null;
  }

  // Actualizar el perfil del usuario
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
}