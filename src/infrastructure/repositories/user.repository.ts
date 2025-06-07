import { eq, and, gte, or, ilike } from "drizzle-orm";
import { usersTable } from "@/infrastructure/database/schemas/user.schema";
import IUserRepository from "@/application/repositories/user.repository.interface";
import db from "@/infrastructure/database";
import { count, asc } from "drizzle-orm";
import { FilterOptions, Role, Status } from "@/domain/entities/user.entity";
import { Status as InfluencerStatus } from "@/domain/entities/influencer.entity";
import { influencersTable } from "@/infrastructure/database/schemas/influencer.schema";
import { userLikesInfluencerTable } from "@/infrastructure/database/schemas/userLikesInfluencer.schema";

export default class UserRepository implements IUserRepository {
  async listPaginated(
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
  > {
    const offset = (pageNumber - 1) * limit;
    const response = await db
      .select()
      .from(usersTable)
      .orderBy(asc(usersTable.id))
      .limit(limit)
      .offset(offset);
    return response;
  }

  async count(): Promise<number> {
    const response = await db.select({ count: count() }).from(usersTable);
    return response[0].count;
  }

  async create(user: {
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
  }> {
    const newUser = await db
      .insert(usersTable)
      .values({
        email: user.email,
        password: user.password,
        name: user.name,
        role: user.role || "user",
        status: user.status || "active",
      })
      .returning();

    return newUser[0];
  }

  async findByEmail(email: string): Promise<{
    id: number;
    email: string;
    password: string;
    name: string;
    role: Role;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
  } | null> {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    return user[0] || null;
  }

  async findById(id: number): Promise<{
    id: number;
    email: string;
    password: string;
    name: string;
    role: Role;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
  } | null> {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));
    return user[0] || null;
  }

  async update(user: {
    id: number;
    email: string;
    password: string;
    name: string;
    role: Role;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
  }): Promise<void> {
    const { id, ...updatableFields } = user;
    await db
      .update(usersTable)
      .set(updatableFields)
      .where(and(eq(usersTable.id, id)))
      .execute();
  }

  async filterPaginated(
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
  > {
    const offset = (pageNumber - 1) * limit;
    const conditions = [];

    if (filters.role) {
      conditions.push(eq(usersTable.role, filters.role));
    }

    if (filters.status) {
      conditions.push(eq(usersTable.status, filters.status));
    }

    if (filters.updatedAt) {
      conditions.push(gte(usersTable.updatedAt, new Date(filters.updatedAt)));
    }

    const response = await db
      .select()
      .from(usersTable)
      .where(and(...conditions))
      .orderBy(usersTable.updatedAt)
      .limit(limit)
      .offset(offset);

    return response;
  }

  async countFiltered(filters: FilterOptions): Promise<number> {
    const conditions = [];

    if (filters.role) {
      conditions.push(eq(usersTable.role, filters.role));
    }

    if (filters.status) {
      conditions.push(eq(usersTable.status, filters.status));
    }

    if (filters.updatedAt) {
      conditions.push(gte(usersTable.updatedAt, new Date(filters.updatedAt)));
    }

    const response = await db
      .select({ count: count() })
      .from(usersTable)
      .where(and(...conditions));

    return response[0].count;
  }

  async searchPaginated(
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
  > {
    const offset = (pageNumber - 1) * limit;
    const conditions = [];

    if (query) {
      conditions.push(
        or(
          ilike(usersTable.email, `%${query}%`),
          ilike(usersTable.name, `%${query}%`)
        )
      );
    }

    const response = await db
      .select()
      .from(usersTable)
      .where(and(...conditions))
      .orderBy(usersTable.updatedAt)
      .limit(limit)
      .offset(offset);

    return response;
  }

  async getFavoritesInfluencers(userId: number) {
    const favorites = await db
      .select({
        id: influencersTable.id,
        username: influencersTable.username,
        profileName: influencersTable.profileName,
        profilePicture: influencersTable.profilePicture,
        profileUrl: influencersTable.profileUrl,
        averageLikes: influencersTable.averageLikes,
        averageComments: influencersTable.averageComments,
        averageShares: influencersTable.averageShares,
        averageSaves: influencersTable.averageSaves,
        averageViews: influencersTable.averageViews,
        followers: influencersTable.followers,
        city: influencersTable.city,
        status: influencersTable.status,
        featuredVideos: influencersTable.featuredVideos,
        createdAt: influencersTable.createdAt,
        updatedAt: influencersTable.updatedAt,
      })
      .from(userLikesInfluencerTable)
      .innerJoin(
        influencersTable,
        eq(userLikesInfluencerTable.influencerId, influencersTable.id)
      )
      .where(eq(userLikesInfluencerTable.userId, userId));

    return favorites.map((influencer) => ({
      ...influencer,
      status: influencer.status as InfluencerStatus,
    }));
  }
}
