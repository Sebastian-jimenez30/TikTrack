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
}
