import { User } from "@/domain/entities/user";

export class UserOverviewPresenter {
  static toHttp(user: User) {
    return {
      name: user.getName(),
      email: user.getEmail(),
      role: user.getRole(),
      updatedAt: user.getUpdatedAt(),
      status: user.getStatus(),
    };
  }
}
