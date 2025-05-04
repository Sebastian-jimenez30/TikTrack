import IUserRepository from "@/application/repositories/user.repository.interface";
import { User } from "@/domain/entities/user";
import PaginationUtil from "@/shared/utils/pagination";
import repositoryContainer from "~/containers/repository.container";

export class UserUseCases {
  private repository: IUserRepository;

  constructor() {
    this.repository =
      repositoryContainer.get<IUserRepository>("IUserRepository");
  }

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
        tempUser.role as "admin" | "user",
        tempUser.status as "active" | "inactive",
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
      role?: string;
      status?: string;
    }
  ) {
    const updatedUser = await this.repository.update(id, user);
    return updatedUser;
  }
}

export const userUseCases = new UserUseCases();
