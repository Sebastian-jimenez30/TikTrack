// src/application/repositories/user.repository.interface.ts
export default interface IUserRepository {
    // Operaciones CRUD
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
  
    updateUser(id: number, data: Partial<{
      email: string;
      password: string;
      name: string;
      role: string;
      status: string;
    }>): Promise<{
      id: number;
      email: string;
      password: string;
      name: string;
      role: string;
      status: string;
      createdAt: Date;
      updatedAt: Date;
    }>;
  
    deleteUser(id: number): Promise<boolean>;
  
    // Operaciones para Admins
    listUsers(page: number, limit: number): Promise<{
      users: {
        id: number;
        email: string;
        password: string;
        name: string;
        role: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
      }[];
      total: number;
    }>;
  
    updateUserRole(id: number, role: string): Promise<{
      id: number;
      email: string;
      password: string;
      name: string;
      role: string;
      status: string;
      createdAt: Date;
      updatedAt: Date;
    }>;
  
    updateUserStatus(id: number, status: string): Promise<{
      id: number;
      email: string;
      password: string;
      name: string;
      role: string;
      status: string;
      createdAt: Date;
      updatedAt: Date;
    }>;
  
    // Operaciones para Usuarios
    updateProfile(id: number, data: Partial<{
      email: string;
      password: string;
      name: string;
    }>): Promise<{
      id: number;
      email: string;
      name: string;
      role: string;
      status: string;
      createdAt: Date;
      updatedAt: Date;
    }>;
  
    getProfile(id: number): Promise<{
      id: number;
      email: string;
      name: string;
      role: string;
      status: string;
      createdAt: Date;
      updatedAt: Date;
    } | null>;
  }