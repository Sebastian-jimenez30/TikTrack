import { FilterOptions, Role, Status } from "@/domain/entities/user";
import { Status as InfluencerStatus } from "@/domain/entities/influencer";
export default interface IUserRepository {
  listPaginated(
    pageNumber: number,
    limit: number
  ): Promise<
    {
      id: number;
      email: string;
      password: string;
      name: string;
      role: Role;
      status: Status;
      createdAt: Date;
      updatedAt: Date;
    }[]
  >;

  count(): Promise<number>;
  countFiltered(filters: FilterOptions): Promise<number>;

  create(user: {
    email: string;
    password: string;
    name: string;
    role?: Role;
    status?: Status;
  }): Promise<{
    id: number;
    email: string;
    name: string;
    role: Role;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
  }>;

  findByEmail(email: string): Promise<{
    id: number;
    email: string;
    password: string;
    name: string;
    role: Role;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
  } | null>;

  findById(id: number): Promise<{
    id: number;
    email: string;
    password: string;
    name: string;
    role: Role;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
  } | null>;

  update(user: {
    id: number;
    email: string;
    password: string;
    name: string;
    role: Role;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
  }): Promise<void>;

  filterPaginated(
    pageNumber: number,
    limit: number,
    filters: FilterOptions
  ): Promise<
    {
      id: number;
      email: string;
      password: string;
      name: string;
      role: Role;
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
      email: string;
      password: string;
      name: string;
      role: Role;
      status: Status;
      createdAt: Date;
      updatedAt: Date;
    }[]
  >;

  getFavoritesInfluencers(userId: number): Promise<
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
      status: InfluencerStatus;
      createdAt: Date;
      updatedAt: Date;
    }[]
  >;
}
