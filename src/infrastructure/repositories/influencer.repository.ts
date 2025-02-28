import influencersTable from "@/infrastructure/database/schemas/influencer.schema";
import IInfluencerRepository from "@/application/repositories/influencer.repository.interface";
import db from "@/infrastructure/database/index";

export default class InfluencerRepository implements IInfluencerRepository {
  async findAll(): Promise<
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
      createdAt: Date;
      updatedAt: Date;
    }[]
  > {
    const response = await db.select().from(influencersTable);
    return response;
  }
}
