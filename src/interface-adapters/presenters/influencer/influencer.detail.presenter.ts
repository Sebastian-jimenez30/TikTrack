import { Influencer } from "@/domain/entities/influencer.entity";

export class InfluencerDetailPresenter {
  static toHttp(influencer: Influencer) {
    return {
      id: influencer.id,
      username: influencer.getUsername(),
      profileName: influencer.getProfileName(),
      profilePicture: influencer.getProfilePicture(),
      profileUrl: influencer.getProfileUrl(),
      averageLikes: influencer.getFormattedAverageLikes(),
      averageComments: influencer.getFormattedAverageComments(),
      averageShares: influencer.getFormattedAverageShares(),
      averageSaves: influencer.getFormattedAverageSaves(),
      averageViews: influencer.getFormattedAverageViews(),
      followers: influencer.getFormattedFollowers(),
      city: influencer.getCity(),
      featuredVideos: influencer.getFeaturedVideos(),
      status: influencer.getStatus(),
      engagementVisualizationRate: influencer.getEngagementVisualizationRate(),
    };
  }
}
