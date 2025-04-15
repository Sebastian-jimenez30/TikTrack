import { userUseCases } from "@/application/use-cases/user.use-case";

export class UserController {
  async show(userId: number): Promise<{
    pageData: object;
  }> {
    let pageData;
    try {
      const user = await userUseCases.getProfile(userId);

      if (!user) {
        pageData = {
          user: null,
          message: "Usuario no encontrado",
          is_success: false,
        };
      } else {
        pageData = {
          user,
          message: "Perfil obtenido con éxito",
          is_success: true,
        };
      }
      return { pageData };
    } catch {
      pageData = {
        user: null,
        message: "Error al obtener el perfil",
        is_success: false,
      };
      return { pageData };
    }
  }
}

export const userController = new UserController();
