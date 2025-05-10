import IUserRepository from "@/application/repositories/user.repository.interface";
import repositoryContainer from "~/containers/repository.container";
import { hash, compare } from "bcryptjs";
import jwtUtil from "@/shared/utils/jwt.util";
import { Role, User } from "@/domain/entities/user";
import { getTranslations } from "next-intl/server";
export class AuthUseCases {
  async signUp(
    email: string,
    password: string,
    name: string,
    locale: string
  ): Promise<{
    token: string | null;
    message: string;
    is_success: boolean;
  }> {
    const t = await getTranslations({ locale, namespace: "SignUpPage" });

    const repository =
      repositoryContainer.get<IUserRepository>("IUserRepository");

    const hashedPassword = await hash(password, 10);

    const user = (await repository.create({
      email,
      password: hashedPassword,
      name,
    })) as {
      id: number;
      email: string;
      password: string;
      name: string;
      role: string;
      status: string;
      createdAt: Date;
      updatedAt: Date;
    };

    const token = await jwtUtil.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      token: token,
      message: t("success"),
      is_success: true,
    };
  }

  async logIn(
    email: string,
    password: string,
    locale: string
  ): Promise<{
    token: string | null;
    message: string;
    is_success: boolean;
  }> {
    const t = await getTranslations({ locale, namespace: "SignInPage" });
    const repository =
      repositoryContainer.get<IUserRepository>("IUserRepository");

    const userData = await repository.findByEmail(email);

    if (!userData) {
      return {
        token: null,
        message: t("userDoesNotExist"),
        is_success: false,
      };
    }

    if (userData.status !== "active") {
      return {
        token: null,
        message: t("userInactive"),
        is_success: false,
      };
    }

    const isValidPassword = await compare(password, userData.password);
    if (!isValidPassword) {
      return {
        token: null,
        message: t("incorrectPassword"),
        is_success: false,
      };
    }

    const user = new User(
      userData.id,
      userData.email,
      userData.password,
      userData.name,
      userData.role as Role,
      userData.status,
      userData.createdAt,
      userData.updatedAt
    );

    const token = await jwtUtil.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      token,
      message: t("success"),
      is_success: true,
    };
  }
}

export const authUseCases = new AuthUseCases();
