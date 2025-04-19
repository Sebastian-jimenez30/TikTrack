import IUserRepository from "@/application/repositories/user.repository.interface";
import repositoryContainer from "~/containers/repository.container";
import { hash, compare } from "bcryptjs";
import jwtUtil from "@/shared/utils/jwt.util";
import { User } from "@/domain/entities/user";
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
    const t = await getTranslations({ locale, namespace: "AuthPage" });
    const repository =
      repositoryContainer.get<IUserRepository>("IUserRepository");

    const existingUser = await repository.findUserByEmail(email);
    if (existingUser) {
      return {
        token: null,
        message: t("signUp.emailExist"),
        is_success: false,
      };
    }

    const hashedPassword = await hash(password, 10);

    const user = (await repository.createUser({
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
      message: t("signUp.success"),
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
    const t = await getTranslations({ locale, namespace: "AuthPage" });
    const repository =
      repositoryContainer.get<IUserRepository>("IUserRepository");

    const userData = await repository.findUserByEmail(email);

    if (!userData) {
      return {
        token: null,
        message: t("signIn.userDoesNotExist"),
        is_success: false,
      };
    }

    if (userData.status !== "active") {
      return {
        token: null,
        message: t("signIn.userInactive"),
        is_success: false,
      };
    }

    const isValidPassword = await compare(password, userData.password);
    if (!isValidPassword) {
      return {
        token: null,
        message: t("signIn.incorrectPassword"),
        is_success: false,
      };
    }

    const user = new User(
      userData.id,
      userData.email,
      userData.password,
      userData.name,
      userData.role as "admin" | "user",
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
      message: t("signIn.success"),
      is_success: true,
    };
  }
}

export const authUseCases = new AuthUseCases();
