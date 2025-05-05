import { userUseCases } from "@/application/use-cases/user.use-case";
import { UserOverviewPresenter } from "@/interface-adapters/presenters/user/user.overview.presenter";
import { UserDetailPresenter } from "@/interface-adapters/presenters/user/user.detail.presenter";
import { Role, Status } from "@/domain/entities/user";

interface IndexProps {
  searchParams: { page?: string };
}

interface ShowProps {
  params: { id: string };
}

interface UpdateProps {
  params: {
    userId: number;
    userData: {
      name?: string;
      email?: string;
      password?: string;
      role?: Role;
      status?: Status;
    };
  };
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

  async update({ params }: UpdateProps): Promise<{ pageData: object }> {
    const { userId, userData } = await params;
    let result;
    let pageData;

    if (!userId || !userData) {
      pageData = {
        isSuccess: false,
      };
      return { pageData };
    } else {
      result = await userUseCases.updateInformation(userId, userData);

      const pageData = {
        isSuccess: result.isSuccess,
      };

      return { pageData };
    }
  }
}

export const userController = new UserController();
