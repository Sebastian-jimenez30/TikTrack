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
}

export const userUseCases = new UserUseCases();
