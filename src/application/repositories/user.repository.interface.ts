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
      role: "admin" | "user";
      status: "active" | "inactive";
      createdAt: Date;
      updatedAt: Date;
    }[]
  >;

  count(): Promise<number>;
    

  create(user: {
    email: string;
    password: string;
    name: string;
    role?: string;
    status?: string;
  }): Promise<{
    id: number;
    email: string;
    name: string;
    role: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }>;

  findUserByEmail(email: string): Promise<{
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  } | null>;

  findUserById(id: number): Promise<{
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  } | null>;

  findAllUsers(): Promise<
    {
      id: number;
      email: string;
      password: string;
      name: string;
      role: "admin" | "user";
      status: "active" | "inactive";
      createdAt: Date;
      updatedAt: Date;
    }[]
  >;

  updateUser(
    id: number,
    user: {
      name?: string;
      email?: string;
      password?: string;
      role?: string;
      status?: string;
    }
  ): Promise<{
    id: number;
    email: string;
    name: string;
    role: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }>;
}
