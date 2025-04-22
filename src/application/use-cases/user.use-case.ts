import IUserRepository from "@/application/repositories/user.repository.interface";
import repositoryContainer from "~/containers/repository.container";

export class UserUseCases {
  private repository: IUserRepository;

  constructor() {
    this.repository =
      repositoryContainer.get<IUserRepository>("IUserRepository");
  }

  async getProfile(userId: number) {
    const user = await this.repository.findUserById(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return user;
  }

  async getAllUsers() {
    const users = await this.repository.findAllUsers();
    return users;
  }

  async updateUser(id: number, user: {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    status?: string;
  }) {
    const updatedUser = await this.repository.updateUser(id, user);
    return updatedUser;
  }

  async deactivateUser(id: number) {
    const deactivatedUser = await this.repository.deactivateUser(id);
    return deactivatedUser;
  }
}

export const userUseCases = new UserUseCases();
