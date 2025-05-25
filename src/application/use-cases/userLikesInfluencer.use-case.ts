import { IUserLikesInfluencerRepository } from "../repositories/userLikesInfluencer.repository.interface";

export class UserLikesInfluencerUseCase {
  constructor(private repo: IUserLikesInfluencerRepository) {}

  async like(userId: number, influencerId: number) {
    await this.repo.addLike(userId, influencerId);
  }
}