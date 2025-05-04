import IUserRepository from "@/application/repositories/user.repository.interface";
import { Role, Status, User } from "@/domain/entities/user";
import PaginationUtil from "@/shared/utils/pagination";
import repositoryContainer from "~/containers/repository.container";

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

  async list(
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
    }
  ): Promise<{ isSuccess: boolean }> {
    const repository =
      repositoryContainer.get<IUserRepository>("IUserRepository");
    const tempUser = await repository.findById(id);
    if (!tempUser) {
      return {
        isSuccess: false,
      };
    }
    tempUser.name = user.name || tempUser.name;
    tempUser.email = user.email || tempUser.email;
    tempUser.password = user.password || tempUser.password;
    tempUser.role = user.role || tempUser.role;
    tempUser.status = user.status || tempUser.status;

    await repository.update(tempUser);

    return {
      isSuccess: true,
    };
  }
}

export const userUseCases = new UserUseCases();
