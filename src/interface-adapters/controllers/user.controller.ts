import { userUseCases } from "@/application/use-cases/user.use-case";

export class UserController {
  async getProfile(userId: number): Promise<{
    user: any;
    message: string;
    is_success: boolean;
  }> {
    try {
      const user = await userUseCases.getProfile(userId);
      return {
        user,
        message: "Perfil obtenido con éxito",
        is_success: true,
      };
    } catch (error) {
      return {
        user: null,
        message: "Error al obtener el perfil",
        is_success: false,
      };
    }
  }
}

export const userController = new UserController();
