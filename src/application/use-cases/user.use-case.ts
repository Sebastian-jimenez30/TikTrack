// src/application/use-cases/user.use-case.ts
import { User } from "@/domain/entities/user";
import IUserRepository from "@/application/repositories/user.repository.interface";
import repositoryContainer from "~/containers/repository.container";
import { hash } from "bcrypt";

export class UserUseCases {
  // Obtener un usuario por ID
  async getUserById(id: number): Promise<User | null> {
    const repository = repositoryContainer.get<IUserRepository>("IUserRepository");
    const tempUser = await repository.findUserById(id);
    if (!tempUser) {
      return null;
    }

    // Crear una instancia de la entidad User
    return new User(
      tempUser.id,
      tempUser.email,
      tempUser.password,
      tempUser.name,
      tempUser.role as "admin" | "user",
      tempUser.status as "active" | "inactive",
      tempUser.createdAt,
      tempUser.updatedAt
    );
  }

  // Actualizar el perfil de un usuario
  async updateProfile(
    id: number,
    data: Partial<{
      email: string;
      password: string;
      name: string;
    }>
  ): Promise<User> {
    const repository = repositoryContainer.get<IUserRepository>("IUserRepository");

    // Si se actualiza la contraseña, hashearla
    if (data.password) {
      data.password = await hash(data.password, 10);
    }

    // Actualizar el usuario en la base de datos
    const tempUser = await repository.updateUser(id, data);

    // Crear una instancia de la entidad User
    return new User(
      tempUser.id,
      tempUser.email,
      tempUser.password,
      tempUser.name,
      tempUser.role as "admin" | "user",
      tempUser.status as "active" | "inactive",
      tempUser.createdAt,
      tempUser.updatedAt
    );
  }

  // Listar usuarios (paginado)
  async listUsers(
    page: number,
    limit: number
  ): Promise<{ users: User[]; total: number }> {
    const repository = repositoryContainer.get<IUserRepository>("IUserRepository");

    // Obtener los usuarios paginados
    const { users: tempUsers, total } = await repository.listUsers(page, limit);

    // Crear instancias de la entidad User
    const users = tempUsers.map(
      (tempUser) =>
        new User(
          tempUser.id,
          tempUser.email,
          tempUser.password,
          tempUser.name,
          tempUser.role as "admin" | "user",
          tempUser.status as "active" | "inactive",
          tempUser.createdAt,
          tempUser.updatedAt
        )
    );

    return { users, total };
  }

  // Actualizar el rol de un usuario (solo para admins)
  async updateUserRole(id: number, role: "admin" | "user"): Promise<User> {
    const repository = repositoryContainer.get<IUserRepository>("IUserRepository");

    // Actualizar el rol del usuario
    const tempUser = await repository.updateUserRole(id, role);

    // Crear una instancia de la entidad User
    return new User(
      tempUser.id,
      tempUser.email,
      tempUser.password,
      tempUser.name,
      tempUser.role as "admin" | "user",
      tempUser.status as "active" | "inactive",
      tempUser.createdAt,
      tempUser.updatedAt
    );
  }

  // Actualizar el estado de un usuario (solo para admins)
  async updateUserStatus(id: number, status: "active" | "inactive"): Promise<User> {
    const repository = repositoryContainer.get<IUserRepository>("IUserRepository");

    // Actualizar el estado del usuario
    const tempUser = await repository.updateUserStatus(id, status);

    // Crear una instancia de la entidad User
    return new User(
      tempUser.id,
      tempUser.email,
      tempUser.password,
      tempUser.name,
      tempUser.role as "admin" | "user",
      tempUser.status as "active" | "inactive",
      tempUser.createdAt,
      tempUser.updatedAt
    );
  }
}

export const userUseCases = new UserUseCases();