import { Influencer } from "@/domain/entities/influencer";

export class InfluencerOverviewPresenter {
  static toHttp(influencer: Influencer) {
    return {
        username: influencer.getUsername(),
        profilePicture: influencer.getProfilePicture(),
        followers: influencer.getFormattedFollowers(),
        city: influencer.getCity(),
        updatedAt: influencer.getUpdatedAt(),
        engagementVisualizationRate: influencer.getEngagementVisualizationRate(),
    };
  }
}