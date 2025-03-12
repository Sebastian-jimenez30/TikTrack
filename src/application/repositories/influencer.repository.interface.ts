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
  >;
  findByUsername(username: string): Promise<{
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
  } | null>;
  count(): Promise<number>;
}
