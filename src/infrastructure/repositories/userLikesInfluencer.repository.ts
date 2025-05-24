import db  from "@/infrastructure/database/index";
import { userLikesInfluencerTable } from "@/infrastructure/database/schemas/userLikesInfluencer.schema";
import { UserLikesInfluencer } from "@/domain/entities/userLikesInfluencer";

export class UserLikesInfluencerRepository {
  async addLike(userId: number, influencerId: number): Promise<void> {
    await db.insert(userLikesInfluencerTable).values({ userId, influencerId });
  }
}