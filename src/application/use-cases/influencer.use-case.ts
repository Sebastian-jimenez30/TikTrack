import { Influencer } from "@/domain/entities/influencer";
import IInfluencerRepository from "@/application/repositories/influencer.repository.interface";
import repositoryContainer from "~/containers/repository.container";
export class InfluencerUseCases {
  async list(pageNumber: number, limit: number): Promise<Influencer[]> {
    const repository = repositoryContainer.get<IInfluencerRepository>(
      "IInfluencerRepository"
    );
    const response = await repository.listPaginated(pageNumber, limit);

    const influencers = response.map((influencer) => {
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
    return influencers;
  }
  async count(): Promise<number> {
    const repository = repositoryContainer.get<IInfluencerRepository>(
      "IInfluencerRepository"
    );

    let response = await repository.count();
    response = Number(response);

    return response;
  }
}
export const influencerUseCases = new InfluencerUseCases();
