export default interface IInfluencerRepository {
  listPaginated(
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
      featuredVideos: string[];
      createdAt: Date;
      updatedAt: Date;
    }[]
  >;
  findByUsername(username: string): Promise<{
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
    featuredVideos: string[];
    createdAt: Date;
    updatedAt: Date;
  } | null>;
  count(): Promise<number>;
}
