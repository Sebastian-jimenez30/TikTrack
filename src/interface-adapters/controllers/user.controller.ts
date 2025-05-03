import { userUseCases } from "@/application/use-cases/user.use-case";
import { UserOverviewPresenter } from "@/interface-adapters/presenters/user/user.overview.presenter";

interface IndexProps {
  searchParams: { page?: string };
}


export class UserController {
  async index({ searchParams }: IndexProps): Promise<{
    pageData: object;
  }>{
    const resolvedParams = await searchParams;

    const { page } = resolvedParams;
    const pageNumber = page ? Number(page) : 1;

    const limit = 8;

    const result = await userUseCases.list(pageNumber, limit);
    
    const users = result.users.map((user) =>
        UserOverviewPresenter.toHttp(user)
    );

    const pageData = {
      users: users,
      count: result.count,
      start: result.start,
      end: result.end,
      hasNextPage: result.hasNextPage,
      hasPreviousPage: result.hasPreviousPage,
    };

    return { pageData };
    
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

  async updateUser(
    userId: number,
    userData: {
      name?: string;
      email?: string;
      password?: string;
      role?: string;
      status?: string;
    }
  ): Promise<{ pageData: object }> {
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
    } catch {
      pageData = {
        user: null,
        is_success: false,
      };
      return { pageData };
    }
  }
}

export const userController = new UserController();
