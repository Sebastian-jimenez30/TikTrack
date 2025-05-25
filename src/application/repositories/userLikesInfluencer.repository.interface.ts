export interface IUserLikesInfluencerRepository {
  addLike(userId: number, influencerId: number): Promise<void>;
}