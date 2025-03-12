import jwt from "jsonwebtoken";

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
}

const jwtUtil = new JwtUtil();
export default jwtUtil;
