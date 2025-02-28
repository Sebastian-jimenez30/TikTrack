import { Influencer } from "@/domain/entities/influencer";
import IInfluencerRepository from "@/application/repositories/influencer.repository.interface";
import repositoryContainer from "~/containers/repository.container";
export class InfluencerUseCases {
  async findAll(): Promise<Influencer[]> {
    const repository = repositoryContainer.get<IInfluencerRepository>(
      "IInfluencerRepository"
    );
    const response = await repository.findAll();

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
        influencer.createdAt,
        influencer.updatedAt
      );
    });
    return influencers;
  }
}
export const influencerUseCases = new InfluencerUseCases();
