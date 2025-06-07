import {
  FilterOptions,
  Influencer,
  Status,
} from "@/domain/entities/influencer.entity";
import IInfluencerRepository from "@/application/repositories/influencer.repository.interface";
import PaginationUtil from "@/shared/utils/pagination.util";
import repositoryContainer from "~/containers/repository.container";
import IUserRepository from "@/application/repositories/user.repository.interface";

export class InfluencerUseCases {
  async listActive(
    pageNumber: number,
    limit: number
  ): Promise<{
    influencers: Influencer[];
    count: number;
    start: number;
    end: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }> {
    const repository = repositoryContainer.get<IInfluencerRepository>(
      "IInfluencerRepository"
    );
    const tempInfluencers = await repository.listActivePaginated(
      pageNumber,
      limit
    );
    const tempCount = await repository.countActive();

    const influencers = tempInfluencers.map((influencer) => {
      return new Influencer(
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
      );
    });

    const count = Number(tempCount);
    const [start, end] = PaginationUtil.getIndexes(
      pageNumber.toString(),
      count,
      limit
    );

    return {
      influencers,
      count,
      start,
      end,
      hasNextPage: end < count,
      hasPreviousPage: start > 1,
    };
  }

  async listInactive(
    pageNumber: number,
    limit: number
  ): Promise<{
    influencers: Influencer[];
    count: number;
    start: number;
    end: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }> {
    const repository = repositoryContainer.get<IInfluencerRepository>(
      "IInfluencerRepository"
    );
    const tempInfluencers = await repository.listInactivePaginated(
      pageNumber,
      limit
    );
    const tempCount = await repository.countInactive();

    const influencers = tempInfluencers.map((influencer) => {
      return new Influencer(
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
      );
    });

    const count = Number(tempCount);
    const [start, end] = PaginationUtil.getIndexes(
      pageNumber.toString(),
      count,
      limit
    );

    return {
      influencers,
      count,
      start,
      end,
      hasNextPage: end < count,
      hasPreviousPage: start > 1,
    };
  }

  async listReported(
    pageNumber: number,
    limit: number
  ): Promise<{
    influencers: Influencer[];
    count: number;
    start: number;
    end: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }> {
    const repository = repositoryContainer.get<IInfluencerRepository>(
      "IInfluencerRepository"
    );
    const tempInfluencers = await repository.listReportedPaginated(
      pageNumber,
      limit
    );
    const tempCount = await repository.countReported();

    const influencers = tempInfluencers.map((influencer) => {
      return new Influencer(
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
      );
    });

    const count = Number(tempCount);
    const [start, end] = PaginationUtil.getIndexes(
      pageNumber.toString(),
      count,
      limit
    );

    return {
      influencers,
      count,
      start,
      end,
      hasNextPage: end < count,
      hasPreviousPage: start > 1,
    };
  }

  async detail(
    username: string
  ): Promise<{ influencer: Influencer | null; haveResults: boolean }> {
    const repository = repositoryContainer.get<IInfluencerRepository>(
      "IInfluencerRepository"
    );
    const tempInfluencer = await repository.findByUsername(username);
    if (!tempInfluencer) {
      return {
        influencer: null,
        haveResults: false,
      };
    } else {
      const influencer = new Influencer(
        tempInfluencer.id,
        tempInfluencer.username,
        tempInfluencer.profileName,
        tempInfluencer.profilePicture,
        tempInfluencer.profileUrl,
        tempInfluencer.averageLikes,
        tempInfluencer.averageComments,
        tempInfluencer.averageShares,
        tempInfluencer.averageSaves,
        tempInfluencer.averageViews,
        tempInfluencer.followers,
        tempInfluencer.city,
        tempInfluencer.featuredVideos,
        tempInfluencer.status,
        tempInfluencer.createdAt,
        tempInfluencer.updatedAt
      );
      return {
        influencer,
        haveResults: true,
      };
    }
  }

  async updateStatus(
    username: string,
    status: Status
  ): Promise<{ isSuccess: boolean }> {
    const repository = repositoryContainer.get<IInfluencerRepository>(
      "IInfluencerRepository"
    );

    const influencer = await repository.findByUsername(username);
    if (!influencer) {
      return {
        isSuccess: false,
      };
    }

    influencer.status = status;
    await repository.update(influencer);

    return {
      isSuccess: true,
    };
  }

  async filter(
    filters: FilterOptions,
    pageNumber: number,
    limit: number
  ): Promise<{
    influencers: Influencer[];
    count: number;
    start: number;
    end: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }> {
    const repository = repositoryContainer.get<IInfluencerRepository>(
      "IInfluencerRepository"
    );
    const tempInfluencers = await repository.filterPaginated(
      pageNumber,
      limit,
      filters
    );

    const influencers = tempInfluencers.map((influencer) => {
      return new Influencer(
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
      );
    });

    const tempCount = await repository.countFiltered(filters);

    const count = Number(tempCount);
    const [start, end] = PaginationUtil.getIndexes(
      pageNumber.toString(),
      count,
      limit
    );

    return {
      influencers,
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
    limit: number,
    status?: Status
  ): Promise<{
    influencers: Influencer[];
    count: number;
    start: number;
    end: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }> {
    const repository = repositoryContainer.get<IInfluencerRepository>(
      "IInfluencerRepository"
    );

    const tempInfluencers = await repository.searchPaginated(
      pageNumber,
      limit,
      query,
      status
    );

    const influencers = tempInfluencers.map((influencer) => {
      return new Influencer(
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
      );
    });

    const tempCount = await repository.countSearchResults(query, status);

    const count = Number(tempCount);
    const [start, end] = PaginationUtil.getIndexes(
      pageNumber.toString(),
      count,
      limit
    );

    return {
      influencers,
      count,
      start,
      end,
      hasNextPage: end < count,
      hasPreviousPage: start > 1,
    };
  }

  async like(
    userId: number,
    influencerId: number
  ): Promise<{ isSuccess: boolean }> {
    const repository = repositoryContainer.get<IInfluencerRepository>(
      "IInfluencerRepository"
    );

    const isSuccess = await repository.addLike(userId, influencerId);
    return { isSuccess: isSuccess };
  }

  async unlike(
    userId: number,
    influencerId: number
  ): Promise<{ isSuccess: boolean }> {
    const repository = repositoryContainer.get<IInfluencerRepository>(
      "IInfluencerRepository"
    );

    const isSuccess = await repository.removeLike(userId, influencerId);
    return { isSuccess: isSuccess };
  }

  async isLikedByUser(userId: number, influencerId: number): Promise<boolean> {
    const repository =
      repositoryContainer.get<IUserRepository>("IUserRepository");
    const userFavorites = await repository.getFavoritesInfluencers(userId);

    const isFavorite = userFavorites.some(
      (favorite: { id: number }) => favorite.id === influencerId
    );
    return isFavorite;
  }
}
export const influencerUseCases = new InfluencerUseCases();
