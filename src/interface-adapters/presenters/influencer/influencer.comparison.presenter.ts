import { Influencer } from "@/domain/entities/influencer";

export class InfluencerComparisonPresenter {
  static toHttp(influencer: Influencer) {
    return {
      username: influencer.getUsername(),
      profilePicture: influencer.getProfilePicture(),
      averageLikes: influencer.getFormattedAverageLikes(),
      averageComments: influencer.getFormattedAverageComments(),
      averageShares: influencer.getFormattedAverageShares(),
      averageSaves: influencer.getFormattedAverageSaves(),
      averageViews: influencer.getFormattedAverageViews(),
      followers: influencer.getFormattedFollowers(),
      status: influencer.getStatus(),
      engagementVisualizationRate: influencer.getEngagementVisualizationRate(),
    };
  }
}
