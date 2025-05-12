import { authUseCases } from "@/application/use-cases/auth.use-case";

export class AuthController {
  async signUp(
    email: string,
    password: string,
    name: string,
    locale: string
  ): Promise<object> {
    const pageData = await authUseCases.signUp(email, password, name, locale);
    return pageData; 
  }

  async logIn(
    email: string,
    password: string,
    locale: string
  ): Promise<{ pageData: object }> {
    const pageData = await authUseCases.logIn(email, password, locale);
    return { pageData };
  }
}
export const authController = new AuthController();
