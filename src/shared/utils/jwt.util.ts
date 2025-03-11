import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret";

interface TokenPayload {
  userId: number; 
  email?: string;
  role?: string;
}

export class JwtService {
  generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, SECRET, { expiresIn: "1h" });
  }

  verifyToken(token: string): TokenPayload {
    return jwt.verify(token, SECRET) as TokenPayload;
  }
}