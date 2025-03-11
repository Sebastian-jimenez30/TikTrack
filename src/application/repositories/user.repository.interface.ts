// src/application/repositories/user.repository.interface.ts
export default interface IUserRepository {
  // Crear un nuevo usuario (registro)
  createUser(user: {
    email: string;
    password: string;
    name: string;
    role?: string;
    status?: string;
  }): Promise<{
    id: number;
    email: string;
    name: string;
    role: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }>;

  // Obtener un usuario por ID (para ver el perfil)
  findUserById(id: number): Promise<{
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  } | null>;

  // Obtener un usuario por email (para el inicio de sesión)
  findUserByEmail(email: string): Promise<{
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  } | null>;

  // Actualizar el perfil del usuario
  updateProfile(
    id: number,
    data: Partial<{
    email: string;
    password: string;
    name: string;
    }>
  ): Promise<{
    id: number;
    email: string;
    name: string;
    role: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }>;
}