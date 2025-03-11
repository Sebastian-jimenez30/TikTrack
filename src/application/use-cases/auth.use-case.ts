// src/application/use-cases/auth.use-case.ts
import IUserRepository from "@/application/repositories/user.repository.interface";
import repositoryContainer from "~/containers/repository.container";
import { hash, compare } from "bcryptjs";
import { JwtService } from "@/shared/utils/jwt.service";
import { User } from "@/domain/entities/user"; // Importar la entidad User

export class AuthUseCases {
  private jwtService: JwtService;

  constructor() {
    this.jwtService = new JwtService();
  }

  // Registro de un nuevo usuario
  async signUp(email: string, password: string, name: string): Promise<{
    user: User; // Usar la entidad User
    token: string;
    message: string;
  }> {
    const repository = repositoryContainer.get<IUserRepository>("IUserRepository");

    // Validar si el email ya está registrado
    const existingUser = await repository.findUserByEmail(email);
    if (existingUser) {
      throw new Error("El email ya está registrado");
    }

    // Hashear la contraseña
    const hashedPassword = await hash(password, 10);

    // Crear el usuario en la base de datos
    const userData = await repository.createUser({
      email,
      password: hashedPassword,
      name,
    }) as { id: number; email: string; password: string; name: string; role: string; status: string; createdAt: Date; updatedAt: Date; };

    // Crear una instancia de User
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

    // Generar un token JWT
    const token = this.jwtService.generateToken({ userId: user.id, email: user.email, role: user.role });

    return {
      user, // Devolver la instancia de User
      token,
      message: "Registro exitoso",
    };
  }

  // Inicio de sesión de un usuario
  async logIn(email: string, password: string): Promise<{
    user: User; // Usar la entidad User
    token: string;
    message: string;
  }> {
    const repository = repositoryContainer.get<IUserRepository>("IUserRepository");

    // Buscar el usuario por email
    const userData = await repository.findUserByEmail(email);
    if (!userData) {
      throw new Error("Usuario no encontrado");
    }

    // Verificar si el usuario está activo
    if (userData.status !== "active") {
      throw new Error("El usuario no está activo");
    }

    // Verificar la contraseña
    const isValidPassword = await compare(password, userData.password);
    if (!isValidPassword) {
      throw new Error("Contraseña incorrecta");
    }

    // Crear una instancia de User
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

    // Generar un token JWT
    const token = this.jwtService.generateToken({ userId: user.id, email: user.email, role: user.role });

    return {
      user, // Devolver la instancia de User
      token,
      message: "Inicio de sesión exitoso",
    };
  }
}

export const authUseCases = new AuthUseCases();