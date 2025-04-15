import { authUseCases } from "@/application/use-cases/auth.use-case";

export class AuthController {
  async signUp(
    email: string,
    password: string,
    name: string
  ): Promise<{
    pageData: Object;
  }> {
    const pageData = await authUseCases.signUp(email, password, name);
    return {pageData};
  }

  async logIn(
    email: string,
    password: string
  ): Promise<{
    pageData: Object;
  }> {
    const pageData = await authUseCases.logIn(email, password);
    return {pageData};
  }
}

export const authController = new AuthController();
