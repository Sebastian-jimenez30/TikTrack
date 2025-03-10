// src/infrastructure/controllers/user.controller.ts
import { userUseCases } from "@/application/use-cases/user.use-case";

export class UserController {
  async getUserById(id: number): Promise<{
    message: string;
    user: {
      id: number;
      email: string;
      name: string;
      role: string;
      status: string;
      createdAt: Date;
      updatedAt: Date;
    } | null;
  }> {
    try {
      const user = await userUseCases.getUserById(id);

      if (!user) {
        return { message: "Usuario no encontrado", user: null };
      }

      return {
        message: "Usuario encontrado",
        user: {
          id: user.getId(),
          email: user.getEmail(),
          name: user.getName(),
          role: user.getRole(),
          status: user.getStatus(),
          createdAt: user.getCreatedAt(),
          updatedAt: user.getUpdatedAt(),
        },
      };
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : "Error al obtener el usuario");
    }
  }

  async updateProfile(
    id: number,
    data: { email?: string; password?: string; name?: string }
  ): Promise<{
    message: string;
    user: {
      id: number;
      email: string;
      name: string;
      role: string;
      status: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }> {
    try {
      const user = await userUseCases.updateProfile(id, data);

      return {
        message: "Perfil actualizado exitosamente",
        user: {
          id: user.getId(),
          email: user.getEmail(),
          name: user.getName(),
          role: user.getRole(),
          status: user.getStatus(),
          createdAt: user.getCreatedAt(),
          updatedAt: user.getUpdatedAt(),
        },
      };
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : "Error al actualizar el perfil");
    }
  }

  async listUsers(
    page: number,
    limit: number
  ): Promise<{
    message: string;
    users: {
      id: number;
      email: string;
      name: string;
      role: string;
      status: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
    total: number;
  }> {
    try {
      const { users, total } = await userUseCases.listUsers(page, limit);

      return {
        message: "Usuarios listados exitosamente",
        users: users.map((user) => ({
          id: user.getId(),
          email: user.getEmail(),
          name: user.getName(),
          role: user.getRole(),
          status: user.getStatus(),
          createdAt: user.getCreatedAt(),
          updatedAt: user.getUpdatedAt(),
        })),
        total,
      };
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : "Error al listar usuarios");
    }
  }

  async updateUserRole(
    id: number,
    role: "admin" | "user"
  ): Promise<{
    message: string;
    user: {
      id: number;
      email: string;
      name: string;
      role: string;
      status: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }> {
    try {
      const user = await userUseCases.updateUserRole(id, role);

      return {
        message: "Rol de usuario actualizado exitosamente",
        user: {
          id: user.getId(),
          email: user.getEmail(),
          name: user.getName(),
          role: user.getRole(),
          status: user.getStatus(),
          createdAt: user.getCreatedAt(),
          updatedAt: user.getUpdatedAt(),
        },
      };
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : "Error al actualizar el rol");
    }
  }

  async updateUserStatus(
    id: number,
    status: "active" | "inactive"
  ): Promise<{
    message: string;
    user: {
      id: number;
      email: string;
      name: string;
      role: string;
      status: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }> {
    try {
      const user = await userUseCases.updateUserStatus(id, status);

      return {
        message: "Estado de usuario actualizado exitosamente",
        user: {
          id: user.getId(),
          email: user.getEmail(),
          name: user.getName(),
          role: user.getRole(),
          status: user.getStatus(),
          createdAt: user.getCreatedAt(),
          updatedAt: user.getUpdatedAt(),
        },
      };
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : "Error al actualizar el estado");
    }
  }
}

export const userController = new UserController();