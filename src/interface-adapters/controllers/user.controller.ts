import { userUseCases } from "@/application/use-cases/user.use-case";


interface UserResponse {
  users: {
    id: number;
    email: string;
    name: string;
    role: "admin" | "user";
    status: "active" | "inactive";
    createdAt: Date;
    updatedAt: Date;
  }[];
  message: string;
  is_success: boolean;
}

export class UserController {

  async getAllUsers(): Promise<{ pageData: UserResponse }> {
    let pageData: UserResponse;
    try {
      const users = await userUseCases.getAllUsers(); 
  
      if (!users || users.length === 0) {
        pageData = {
          users: [],
          message: "No se encontraron usuarios",
          is_success: false,
        };
      } else {
        pageData = {
          users,
          message: "Usuarios obtenidos con éxito",
          is_success: true,
        };
      }
  
      return { pageData };
    } catch (error) {
      console.error("Error getting users:", error);
      pageData = {
        users: [],
        message: "Error al obtener los usuarios",
        is_success: false,
      };
      return { pageData };
    }
  }

  async show(userId: number): Promise<{ pageData: object }> {
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

  async updateUser(userId: number, userData: {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    status?: string;
  }): Promise<{ pageData: object }> {
    let pageData;
    try {
      const updatedUser = await userUseCases.updateUser(userId, userData);

      if (!updatedUser) {
        pageData = {
          user: null,
          message: "Error al actualizar el usuario",
          is_success: false,
        };
      } else {
        pageData = {
          user: updatedUser,
          message: "Usuario actualizado con éxito",
          is_success: true,
        };
      }
      return { pageData };
    } catch (error) {
      console.error("Error updating user:", error);
      pageData = {
        user: null,
        message: "Error al actualizar el usuario",
        is_success: false,
      };
      return { pageData };
    }
  }

  async deactivateUser(userId: number): Promise<{ pageData: object }> {
    let pageData;
    try {
      const deactivatedUser = await userUseCases.deactivateUser(userId);

      if (!deactivatedUser) {
        pageData = {
          user: null,
          message: "Error al desactivar el usuario",
          is_success: false,
        };
      } else {
        pageData = {
          user: deactivatedUser,
          message: "Usuario desactivado con éxito",
          is_success: true,
        };
      }
      return { pageData };
    } catch (error) {
      console.error("Error deactivating user:", error);
      pageData = {
        user: null,
        message: "Error al desactivar el usuario",
        is_success: false,
      };
      return { pageData };
    }
  }
}

export const userController = new UserController();
