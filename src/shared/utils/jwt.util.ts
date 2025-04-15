import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  userId: number;
  email?: string;
  role?: string;
}

class JwtUtil {
  secret: string;

  constructor() {
    this.secret = process.env.JWT_SECRET || "secret";
  }
  generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: "1h" });
  }

  verifyToken(token: string): TokenPayload {
    return jwt.verify(token, this.secret) as TokenPayload;
  }

  getUserIdFromToken(token: string): number {
    return this.verifyToken(token).userId;
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp !== undefined && decoded.exp < currentTime;
    } catch {
      return true;
    }
  }

  isAdmin(token: string): boolean {
    const decoded = jwtDecode(token) as TokenPayload;
    return decoded.role === "admin";
  }
}

const jwtUtil = new JwtUtil();
export default jwtUtil;
