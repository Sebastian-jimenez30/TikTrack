export default interface IUserRepository {
  createUser(user: {
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

  updateProfile(
    id: number,
    data: Partial<{
    email: string;
    password: string;
    name: string;
    }>
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