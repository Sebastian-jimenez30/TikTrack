interface IInfluencerManagementService {
  fetchInfluencers(): Promise<
    {
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
    }[]
  >;
}

export default IInfluencerManagementService;
