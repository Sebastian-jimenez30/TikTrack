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
          is_success: false,
        };
      } else {
        pageData = {
          users,
          is_success: true,
        };
      }
  
      return { pageData };
    } catch  {
      pageData = {
        users: [],
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
          is_success: false,
        };
      } else {
        pageData = {
          user,
          is_success: true,
        };
      }
      return { pageData };
    } catch {
      pageData = {
        user: null,
        is_success: false,
      };
      return { pageData };
    }
  }

  async updateUser(userId: number, userData: { name?: string, email?: string, password?: string, role?: string, status?: string }): Promise<{ pageData: object }> {
    let pageData;
    try {
      const updatedUser = await userUseCases.updateUser(userId, userData);

      if (!updatedUser) {
        pageData = {
          user: null,
          is_success: false,
        };
      } else {
        pageData = {
          user: updatedUser,
          is_success: true,
        };
      }
      return { pageData };
    } catch  {
      pageData = {
        user: null,
        is_success: false,
      };
      return { pageData };
    }
  }

}

export const userController = new UserController();
