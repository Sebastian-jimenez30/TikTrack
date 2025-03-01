export default interface IInfluencerRepository {
  findAll(): Promise<
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
  >;
}
