import { count } from "drizzle-orm";

import { influencersTable } from "@/infrastructure/database/schemas/influencer.schema";
import IInfluencerRepository from "@/application/repositories/influencer.repository.interface";
import db from "@/infrastructure/database/index";
import { eq } from "drizzle-orm";

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
      averageLikes: number;
      averageComments: number;
      averageShares: number;
      averageSaves: number;
      averageViews: number;
      followers: number;
      city: string;
      featuredVideos: string[];
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

  async findByUsername(username: string): Promise<{
    id: number;
    username: string;
    profileName: string;
    profilePicture: string;
    profileUrl: string;
    averageLikes: number;
    averageComments: number;
    averageShares: number;
    averageSaves: number;
    averageViews: number;
    followers: number;
    city: string;
    featuredVideos: string[];
    createdAt: Date;
    updatedAt: Date;
  } | null> {
    const response = await db
      .select()
      .from(influencersTable)
      .where(eq(influencersTable.username, username));
    return response.length > 0 ? response[0] : null;
  }

  async count(): Promise<number> {
    const response = await db.select({ count: count() }).from(influencersTable);
    return response[0].count;
  }

  async create(influencer: {
    username: string;
    profileName: string;
    profilePicture: string;
    profileUrl: string;
    averageLikes: number;
    averageComments: number;
    averageShares: number;
    averageSaves: number;
    averageViews: number;
    followers: number;
    city: string;
    featuredVideos: string[];
  }): Promise<void> {
    await db.insert(influencersTable).values(influencer).execute();
  }
}
