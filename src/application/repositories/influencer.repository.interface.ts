import { FilterOptions, Status } from "@/domain/entities/influencer";

export default interface IInfluencerRepository {
  listActivePaginated(
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
      status: Status;
      createdAt: Date;
      updatedAt: Date;
    }[]
  >;
  listInactivePaginated(
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
      status: Status;
      createdAt: Date;
      updatedAt: Date;
    }[]
  >;
  listReportedPaginated(
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
      status: Status;
      createdAt: Date;
      updatedAt: Date;
    }[]
  >;
  filterPaginated(
    pageNumber: number,
    limit: number,
    filters: FilterOptions
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
      status: Status;
      createdAt: Date;
      updatedAt: Date;
    }[]
  >;

  searchPaginated(
    pageNumber: number,
    limit: number,
    query: string
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
      status: Status;
      createdAt: Date;
      updatedAt: Date;
    }[]
  >;

  countSearchResults(query: string): Promise<number>;

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
    status: Status;
    createdAt: Date;
    updatedAt: Date;
  } | null>;

  countActive(): Promise<number>;
  countInactive(): Promise<number>;
  countReported(): Promise<number>;

  create(influencer: {
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
  }): Promise<void>;

  update(influencer: {
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
    status: Status;
    createdAt: Date;
    updatedAt: Date;
  }): Promise<void>;
}
