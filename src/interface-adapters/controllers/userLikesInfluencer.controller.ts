import { UserLikesInfluencerUseCase } from "@/application/use-cases/userLikesInfluencer.use-case";
import { UserLikesInfluencerRepository } from "@/infrastructure/repositories/userLikesInfluencer.repository";

const userLikesInfluencerRepository = new UserLikesInfluencerRepository();
const userLikesInfluencerUseCase = new UserLikesInfluencerUseCase(userLikesInfluencerRepository);

export const userLikesInfluencerController = {
  async like(req: { userId: number; influencerId: number }) {
    await userLikesInfluencerUseCase.like(req.userId, req.influencerId);
    return { success: true };
  },
};