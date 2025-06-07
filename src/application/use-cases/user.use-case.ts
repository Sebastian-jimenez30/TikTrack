import IUserRepository from "@/application/repositories/user.repository.interface";
import { FilterOptions, Role, Status, User } from "@/domain/entities/user";
import PaginationUtil from "@/shared/utils/pagination";
import repositoryContainer from "~/containers/repository.container";
import { hash } from "bcryptjs";
import { validatePasswordStrength } from "@/shared/utils/password.util";
import { getTranslations } from "next-intl/server";
import { Influencer } from "@/domain/entities/influencer";

export class UserUseCases {
  async detail(id: number): Promise<{
    user: User | null;
    favoritesInfluencers: Influencer[];
    haveResults: boolean;
  }> {
    const repository =
      repositoryContainer.get<IUserRepository>("IUserRepository");
    const tempUser = await repository.findById(id);
    if (!tempUser) {
      return {
        user: null,
        favoritesInfluencers: [],
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

      const favoritesInfluencersData =
        await repository.getFavoritesInfluencers(id);
      const favoritesInfluencers = favoritesInfluencersData.map(
        (influencer) =>
          new Influencer(
            influencer.id,
            influencer.username,
            influencer.profileName,
            influencer.profilePicture,
            influencer.profileUrl,
            influencer.averageLikes,
            influencer.averageComments,
            influencer.averageShares,
            influencer.averageSaves,
            influencer.averageViews,
            influencer.followers,
            influencer.city,
            influencer.featuredVideos,
            influencer.status,
            influencer.createdAt,
            influencer.updatedAt
          )
      );

      return {
        user,
        favoritesInfluencers,
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
  ): Promise<{ isSuccess: boolean; message?: string }> {
    const repository =
      repositoryContainer.get<IUserRepository>("IUserRepository");
    const t = await getTranslations({
      locale,
      namespace: "UserManagementShowPage",
    });

    if (!id || !user) {
      return {
        isSuccess: false,
        message: t("errors.missingData"),
      };
    }

    const tempUser = await repository.findById(id);

    if (!tempUser) {
      return {
        isSuccess: false,
        message: t("errors.userNotFound"),
      };
    }

    tempUser.name = user.name || tempUser.name;
    tempUser.email = user.email || tempUser.email;
    tempUser.role = user.role || tempUser.role;
    tempUser.status = user.status || tempUser.status;

    if (user.password) {
      const passwordValidation = await validatePasswordStrength(
        user.password,
        locale
      );
      if (!passwordValidation.isValid) {
        return {
          isSuccess: false,
          message: passwordValidation.message,
        };
      }

      const hashedPassword = await hash(user.password, 10);
      tempUser.password = hashedPassword;
    }

    await repository.update(tempUser);

    return {
      isSuccess: true,
      message: t("errors.updateSuccess"),
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

    const tempCount = await repository.countFiltered(filters);

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

  async search(
    query: string,
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
    const tempUsers = await repository.searchPaginated(
      pageNumber,
      limit,
      query
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
