import { userUseCases } from "@/application/use-cases/user.use-case";
import { UserOverviewPresenter } from "@/interface-adapters/presenters/user/user.overview.presenter";
import { UserDetailPresenter } from "@/interface-adapters/presenters/user/user.detail.presenter";

interface IndexProps {
  searchParams: { page?: string };
}

interface ShowProps {
  params: { id: string };
}

export class UserController {
  async index({ searchParams }: IndexProps): Promise<{
    pageData: object;
  }> {
    const resolvedParams = await searchParams;

    const { page } = resolvedParams;
    const pageNumber = page ? Number(page) : 1;

    const limit = 8;

    const result = await userUseCases.list(pageNumber, limit);

    const users = result.users.map((user) =>
      UserOverviewPresenter.toHttp(user)
    );

    const emptyRowCount = Math.max(0, 8 - users.length);
    const emptyRows = Array.from({ length: emptyRowCount });

    const pageData = {
      users: users,
      count: result.count,
      start: result.start,
      end: result.end,
      hasNextPage: result.hasNextPage,
      hasPreviousPage: result.hasPreviousPage,
      emptyRows: emptyRows,
    };

    return { pageData };
  }

  async show({ params }: ShowProps): Promise<{
    pageData: object;
  }> {
    const { id } = await params;
    const result = await userUseCases.detail(Number(id));

    let user = null;

    if (result.user) {
      const tempUser = result.user;
      user = UserDetailPresenter.toHttp(tempUser);
    }

    const pageData = {
      user,
      haveResults: result.haveResults,
    };

    return { pageData };
  }

  async update(
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
      const updatedUser = await userUseCases.updateInformation(
        userId,
        userData
      );

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
