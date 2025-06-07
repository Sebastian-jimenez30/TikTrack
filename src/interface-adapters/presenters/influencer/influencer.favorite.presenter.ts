import { Influencer } from "@/domain/entities/influencer.entity";

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
