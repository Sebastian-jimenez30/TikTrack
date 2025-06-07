import { Influencer } from "@/domain/entities/influencer";

export class InfluencerFavoritePresenter {
  static toHttp(influencer: Influencer) {
    return {
      id: influencer.id,
      username: influencer.getUsername(),
      profileName: influencer.getProfileName(),
      profilePicture: influencer.getProfilePicture(),
    };
  }
}
