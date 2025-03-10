// src/infrastructure/controllers/user.controller.ts
import { Request, Response } from "express";
import { userUseCases } from "@/application/use-cases/user.use-case";

export class UserController {
  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Llamar al caso de uso para obtener el usuario
      const user = await userUseCases.getUserById(Number(id));

      if (!user) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }

      // Devolver la respuesta
      res.status(200).json({
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
      });
    } catch (error: unknown) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { email, password, name } = req.body;

      // Llamar al caso de uso para actualizar el perfil
      const user = await userUseCases.updateProfile(Number(id), {
        email,
        password,
        name,
      });

      // Devolver la respuesta
      res.status(200).json({
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
      });
    } catch (error: unknown) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async listUsers(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10 } = req.query;

      // Llamar al caso de uso para listar usuarios
      const { users, total } = await userUseCases.listUsers(Number(page), Number(limit));

      // Devolver la respuesta
      res.status(200).json({
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
      });
    } catch (error: unknown) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async updateUserRole(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { role } = req.body;

      // Llamar al caso de uso para actualizar el rol
      const user = await userUseCases.updateUserRole(Number(id), role as "admin" | "user");

      // Devolver la respuesta
      res.status(200).json({
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
      });
    } catch (error: unknown) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async updateUserStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Llamar al caso de uso para actualizar el estado
      const user = await userUseCases.updateUserStatus(Number(id), status as "active" | "inactive");

      // Devolver la respuesta
      res.status(200).json({
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
      });
    } catch (error: unknown) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}

export const userController = new UserController();