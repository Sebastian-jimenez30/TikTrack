import IInfluencerRepository from "@/application/repositories/influencer.repository.interface";
import repositoryContainer from "~/containers/repository.container";
import { Influencer } from "@/domain/entities/influencer";

export class InfluencerComparisonUseCases {
  async compareInfluencers(usernames: string[]): Promise<{
    isSuccess: boolean;
    influencers: Influencer[];
    error?: string;
  }> {
    try {
      const repository = repositoryContainer.get<IInfluencerRepository>(
        "IInfluencerRepository"
      );

      const tempInfluencers = await Promise.all(
        usernames.map(username => repository.findByUsername(username))
      );

      const influencers = tempInfluencers
      .filter((inf): inf is NonNullable<typeof inf> => inf != null)
      .map((influencer) => new Influencer(
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
      ));

      return {
        isSuccess: true,
        influencers: influencers
      };
    } catch (error) {
      return {
        isSuccess: false,
        influencers: [],
        error: 'Error fetching comparison'
      };
    }
  }
}

export const influencerComparisonUseCases = new InfluencerComparisonUseCases(); 