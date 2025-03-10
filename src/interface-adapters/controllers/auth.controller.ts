// src/infrastructure/controllers/auth.controller.ts
import { authUseCases } from "@/application/use-cases/auth.use-case";

export class AuthController {
  // Registro de un nuevo usuario
  async signUp(email: string, password: string, name: string): Promise<{
    message: string;
    user: {
      id: number;
      email: string;
      name: string;
      role: string;
      status: string;
    };
    token: string;
  }> {
    try {
      // Llamar al caso de uso de registro
      const { user, token } = await authUseCases.signUp(email, password, name);

      // Devolver la respuesta
      return {
        message: "Usuario registrado exitosamente",
        user: {
          id: user.getId(),
          email: user.getEmail(),
          name: user.getName(),
          role: user.getRole(),
          status: user.getStatus(),
        },
        token,
      };
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : "Error en el registro");
    }
  }

  // Inicio de sesión de un usuario
  async logIn(email: string, password: string): Promise<{
    message: string;
    user: {
      id: number;
      email: string;
      name: string;
      role: string;
      status: string;
    };
    token: string;
  }> {
    try {
      // Llamar al caso de uso de inicio de sesión
      const { user, token } = await authUseCases.logIn(email, password);

      // Devolver la respuesta
      return {
        message: "Inicio de sesión exitoso",
        user: {
          id: user.getId(),
          email: user.getEmail(),
          name: user.getName(),
          role: user.getRole(),
          status: user.getStatus(),
        },
        token,
      };
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : "Error en el inicio de sesión");
    }
  }
}

export const authController = new AuthController();