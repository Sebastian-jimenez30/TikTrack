import { User } from "@/domain/entities/user";

export class UserDetailPresenter {
  static toHttp(user: User) {
    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      role: user.getRole(),
      updatedAt: user.getUpdatedAt(),
      status: user.getStatus(),
      createdAt: user.getCreatedAt(),
    };
  }
}
