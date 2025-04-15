import { Influencer } from "@/domain/entities/influencer";

export class InfluencerDetailPresenter {
  static toHttp(influencer: Influencer) {
    return {
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
        engagementVisualizationRate: influencer.getEngagementVisualizationRate(),
    };
  }
}