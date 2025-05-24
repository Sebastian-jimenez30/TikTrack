import { eq, and } from "drizzle-orm";

import db  from "@/infrastructure/database/index";
import { userLikesInfluencerTable } from "@/infrastructure/database/schemas/userLikesInfluencer.schema";
import { influencersTable } from "@/infrastructure/database/schemas/influencer.schema"; // Ajusta la ruta si es necesario

export class UserLikesInfluencerRepository {
  async addLike(userId: number, influencerId: number): Promise<void> {
    const exists = await db
      .select()
      .from(userLikesInfluencerTable)
      .where(
        and(
          eq(userLikesInfluencerTable.userId, userId),
          eq(userLikesInfluencerTable.influencerId, influencerId)
      
        )
      )
      .limit(1);

    if (exists.length === 0) {
      await db.insert(userLikesInfluencerTable).values({ userId, influencerId });
    }
  }

  async getFavoritesByUserId(userId: number) {
   
    const favorites = await db
      .select({
        id: influencersTable.id,
        username: influencersTable.username,
        profileName: influencersTable.profileName,
        profilePicture: influencersTable.profilePicture,
        profileUrl: influencersTable.profileUrl,
        followers: influencersTable.followers,
        city: influencersTable.city,
        status: influencersTable.status,
      })
      .from(userLikesInfluencerTable)
      .innerJoin(
        influencersTable,
        eq(userLikesInfluencerTable.influencerId, influencersTable.id)
      )
      .where(eq(userLikesInfluencerTable.userId, userId))
    return favorites;
  }


}