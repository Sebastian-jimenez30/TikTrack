import { Influencer } from "@/domain/entities/influencer";
import IInfluencerRepository from "@/application/repositories/influencer.repository.interface";
import repositoryContainer from "~/containers/repository.container";
import PaginationUtil from "@/interface-adapters/utils/pagination";
export class InfluencerUseCases {
  async listWithPagination(
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
    const tempInfluencers = await repository.listPaginated(pageNumber, limit);
    const tempCount = await repository.count();

    const influencers = tempInfluencers.map((influencer) => {
      return new Influencer(
        influencer.id,
        influencer.username,
        influencer.profileName,
        influencer.profilePicture,
        influencer.profileUrl,
        influencer.profileDescription,
        influencer.totalLikes,
        influencer.totalComments,
        influencer.totalShares,
        influencer.totalSaves,
        influencer.totalViews,
        influencer.totalFollowers,
        influencer.city,
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
