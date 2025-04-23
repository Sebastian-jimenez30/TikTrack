import { Influencer, Status } from "@/domain/entities/influencer";
import IInfluencerRepository from "@/application/repositories/influencer.repository.interface";
import PaginationUtil from "@/shared/utils/pagination";
import repositoryContainer from "~/containers/repository.container";

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
  
  async search(
    query: string,
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
  
    // Fetch influencers matching the query
    const tempInfluencers = await repository.searchPaginated(query, pageNumber, limit);
    const tempCount = await repository.countSearchResults(query);
  
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

}
export const influencerUseCases = new InfluencerUseCases();
