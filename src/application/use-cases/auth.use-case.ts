import IUserRepository from "@/application/repositories/user.repository.interface";
import repositoryContainer from "~/containers/repository.container";
import { hash, compare } from "bcryptjs";
import { JwtService } from "@/shared/utils/jwt.util";
import { User } from "@/domain/entities/user"; 
export class AuthUseCases {
  private jwtService: JwtService;

  constructor() {
    this.jwtService = new JwtService();
  }

  async signUp(email: string, password: string, name: string): Promise<{
    user: User; 
    token: string;
    message: string;
  }> {
    const repository = repositoryContainer.get<IUserRepository>("IUserRepository");

    const existingUser = await repository.findUserByEmail(email);
    if (existingUser) {
      throw new Error("El email ya está registrado");
    }

    const hashedPassword = await hash(password, 10);

    const userData = await repository.createUser({
      email,
      password: hashedPassword,
      name,
    }) as { id: number; email: string; password: string; name: string; role: string; status: string; createdAt: Date; updatedAt: Date; };

    const user = new User(
      userData.id,
      userData.email,
      userData.password,
      userData.name,
      userData.role as "admin" | "user",
      userData.status as "active" | "inactive",
      userData.createdAt,
      userData.updatedAt
    );

    const token = this.jwtService.generateToken({ userId: user.id, email: user.email, role: user.role });

    return {
      user, 
      token,
      message: "Registro exitoso",
    };
  }

  async logIn(email: string, password: string): Promise<{
    user: User; 
    token: string;
    message: string;
  }> {
    const repository = repositoryContainer.get<IUserRepository>("IUserRepository");

    const userData = await repository.findUserByEmail(email);
    if (!userData) {
      throw new Error("Usuario no encontrado");
    }

    if (userData.status !== "active") {
      throw new Error("El usuario no está activo");
    }

    const isValidPassword = await compare(password, userData.password);
    if (!isValidPassword) {
      throw new Error("Contraseña incorrecta");
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

    const token = this.jwtService.generateToken({ userId: user.id, email: user.email, role: user.role });

    return {
      user, 
      token,
      message: "Inicio de sesión exitoso",
    };
  }
}

export const authUseCases = new AuthUseCases();