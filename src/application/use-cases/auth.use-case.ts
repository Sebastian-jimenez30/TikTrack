// src/application/use-cases/auth.use-case.ts
import { User } from "@/domain/entities/user";
import IUserRepository from "@/application/repositories/user.repository.interface";
import repositoryContainer from "~/containers/repository.container";
import { hash, compare } from "bcryptjs";
import { JwtService } from "@/infrastructure/services/jwt.service";

export class AuthUseCases {
  private jwtService: JwtService;

  constructor() {
    this.jwtService = new JwtService();
  }

  // Registro de un nuevo usuario
  async signUp(email: string, password: string, name: string): Promise<{ user: User; token: string }> {
    const repository = repositoryContainer.get<IUserRepository>("IUserRepository");

    // Validar si el email ya está registrado
    const existingUser = await repository.findUserByEmail(email);
    if (existingUser) {
      throw new Error("El email ya está registrado");
    }

    // Hashear la contraseña
    const hashedPassword = await hash(password, 10);

    // Crear el usuario en la base de datos
    const tempUser = await repository.createUser({
      email,
      password: hashedPassword,
      name,
    }) as { id: number; email: string; password: string; name: string; role: string; status: string; createdAt: Date; updatedAt: Date; };

    // Crear una instancia de la entidad User
    const user = new User(
      tempUser.id,
      tempUser.email,
      tempUser.password,
      tempUser.name,
      tempUser.role as "admin" | "user",
      tempUser.status as "active" | "inactive",
      tempUser.createdAt,
      tempUser.updatedAt
    );

    // Generar un token JWT
    const token = this.jwtService.generateToken({ userId: user.getId(), email: user.getEmail(), role: user.getRole() });

    return { user, token };
  }

  // Inicio de sesión de un usuario
  async logIn(email: string, password: string): Promise<{ user: User; token: string }> {
    const repository = repositoryContainer.get<IUserRepository>("IUserRepository");

    // Buscar el usuario por email
    const tempUser = await repository.findUserByEmail(email) as { id: number; email: string; password: string; name: string; role: string; status: string; createdAt: Date; updatedAt: Date; };
    if (!tempUser) {
      throw new Error("Usuario no encontrado");
    }

    // Verificar si el usuario está activo
    if (tempUser.status !== "active") {
      throw new Error("El usuario no está activo");
    }

    // Verificar la contraseña
    const isValidPassword = await compare(password, tempUser.password);
    if (!isValidPassword) {
      throw new Error("Contraseña incorrecta");
    }

    // Crear una instancia de la entidad User
    const user = new User(
      tempUser.id,
      tempUser.email,
      tempUser.password,
      tempUser.name,
      tempUser.role as "admin" | "user",
      tempUser.status as "active" | "inactive",
      tempUser.createdAt,
      tempUser.updatedAt
    );

    // Generar un token JWT
    const token = this.jwtService.generateToken({ userId: user.getId(), email: user.getEmail(), role: user.getRole() });

    return { user, token };
  }
}

export const authUseCases = new AuthUseCases();