// src/infrastructure/controllers/auth.controller.ts
import { Request, Response } from "express";
import { authUseCases } from "@/application/use-cases/auth.use-case";

export class AuthController {
  // Registro de un nuevo usuario
  async signUp(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, name } = req.body;

      // Llamar al caso de uso de registro
      const { user, token } = await authUseCases.signUp(email, password, name);

      // Devolver la respuesta
      res.status(201).json({
        message: "Usuario registrado exitosamente",
        user: {
          id: user.getId(),
          email: user.getEmail(),
          name: user.getName(),
          role: user.getRole(),
          status: user.getStatus(),
        },
        token,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "Unknown error" });
      }
    }
  }

  // Inicio de sesión de un usuario
  async logIn(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Llamar al caso de uso de inicio de sesión
      const { user, token } = await authUseCases.logIn(email, password);

      // Devolver la respuesta
      res.status(200).json({
        message: "Inicio de sesión exitoso",
        user: {
          id: user.getId(),
          email: user.getEmail(),
          name: user.getName(),
          role: user.getRole(),
          status: user.getStatus(),
        },
        token,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "Unknown error" });
      }
    }
  }
}

export const authController = new AuthController();