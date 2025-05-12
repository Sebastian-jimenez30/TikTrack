import IUserRepository from "@/application/repositories/user.repository.interface";
import { FilterOptions, Role, Status, User } from "@/domain/entities/user";
import PaginationUtil from "@/shared/utils/pagination";
import repositoryContainer from "~/containers/repository.container";
import { hash } from "bcryptjs";
import { validatePasswordStrength } from "@/shared/utils/password.util";

export class UserUseCases {
  async detail(
    id: number
  ): Promise<{ user: User | null; haveResults: boolean }> {
    const repository =
      repositoryContainer.get<IUserRepository>("IUserRepository");
    const tempUser = await repository.findById(id);
    if (!tempUser) {
      return {
        user: null,
        haveResults: false,
      };
    } else {
      const user = new User(
        tempUser.id,
        tempUser.email,
        tempUser.password,
        tempUser.name,
        tempUser.role as Role,
        tempUser.status as Status,
        tempUser.createdAt,
        tempUser.updatedAt
      );
      return {
        user,
        haveResults: true,
      };
    }
  }

  async listPaginated(
    pageNumber: number,
    limit: number
  ): Promise<{
    users: User[];
    count: number;
    start: number;
    end: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }> {
    const repository =
      repositoryContainer.get<IUserRepository>("IUserRepository");
    const tempusers = await repository.listPaginated(pageNumber, limit);

    const users = tempusers.map((user) => {
      return new User(
        user.id,
        user.email,
        user.password,
        user.name,
        user.role,
        user.status,
        user.createdAt,
        user.updatedAt
      );
    });

    const tempCount = await repository.count();
    const count = Number(tempCount);

    const [start, end] = PaginationUtil.getIndexes(
      pageNumber.toString(),
      count,
      limit
    );

    return {
      users,
      count,
      start,
      end,
      hasNextPage: end < count,
      hasPreviousPage: start > 1,
    };
  }

  async updateInformation(
    id: number,
    user: {
      name?: string;
      email?: string;
      password?: string;
      role?: Role;
      status?: Status;
    },
    locale: string
  ): Promise<{ isSuccess: boolean }> {
    const repository = repositoryContainer.get<IUserRepository>("IUserRepository");
    const tempUser = await repository.findById(id);

    if (!tempUser) {
      return {
        isSuccess: false,
      };
    }

    tempUser.name = user.name || tempUser.name;
    tempUser.email = user.email || tempUser.email;
    tempUser.role = user.role || tempUser.role;
    tempUser.status = user.status || tempUser.status;

    if (user.password) {
      await validatePasswordStrength(user.password, locale); 
      const hashedPassword = await hash(user.password, 10);
      tempUser.password = hashedPassword;
    }

    await repository.update(tempUser);

    return {
      isSuccess: true,
    };
  }


  async filter(
    filters: FilterOptions,
    pageNumber: number,
    limit: number
  ): Promise<{
    users: User[];
    count: number;
    start: number;
    end: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }> {
    const repository =
      repositoryContainer.get<IUserRepository>("IUserRepository");
    const tempUsers = await repository.filterPaginated(
      pageNumber,
      limit,
      filters
    );

    const tempCount = await repository.count();

    const users = tempUsers.map((user) => {
      return new User(
        user.id,
        user.email,
        user.password,
        user.name,
        user.role as Role,
        user.status as Status,
        user.createdAt,
        user.updatedAt
      );
    });

    const count = Number(tempCount);
    const [start, end] = PaginationUtil.getIndexes(
      pageNumber.toString(),
      count,
      10
    );

    return {
      users,
      count,
      start,
      end,
      hasNextPage: end < count,
      hasPreviousPage: start > 1,
    };
  }
}

export const userUseCases = new UserUseCases();
