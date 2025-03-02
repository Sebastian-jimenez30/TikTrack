import { count } from "drizzle-orm";

import { influencersTable } from "@/infrastructure/database/schemas/influencer.schema";
import IInfluencerRepository from "@/application/repositories/influencer.repository.interface";
import db from "@/infrastructure/database/index";

export default class InfluencerRepository implements IInfluencerRepository {
  async listPaginated(
    pageNumber: number,
    limit: number
  ): Promise<
    {
      id: number;
      username: string;
      profileName: string;
      profilePicture: string;
      profileUrl: string;
      profileDescription: string;
      totalLikes: number;
      totalComments: number;
      totalShares: number;
      totalSaves: number;
      totalViews: number;
      totalFollowers: number;
      city: string;
      createdAt: Date;
      updatedAt: Date;
    }[]
  > {
    const offset = (pageNumber - 1) * limit;
    const response = await db
      .select()
      .from(influencersTable)
      .limit(limit)
      .offset(offset);
    return response;
  }

  async count(): Promise<number> {
    const response = await db.select({ count: count() }).from(influencersTable);
    return response[0].count;
  }
}
