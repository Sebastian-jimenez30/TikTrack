// src/infrastructure/services/jwt.service.ts
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret";

interface TokenPayload {
  userId: number; 
  email?: string;
  role?: string;
}

export class JwtService {
  // Generar un token JWT
  generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, SECRET, { expiresIn: "1h" });
  }

  // Verificar un token JWT
  verifyToken(token: string): TokenPayload {
    return jwt.verify(token, SECRET) as TokenPayload;
  }
}