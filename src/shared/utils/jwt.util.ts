import { SignJWT, jwtVerify, JWTPayload } from "jose";

interface TokenPayload {
  userId: number;
  email?: string;
  role?: string;
}

class JwtUtil {
  secret: Uint8Array;

  constructor() {
    const rawSecret = process.env.JWT_SECRET || "secret";
    this.secret = new TextEncoder().encode(rawSecret);
  }

  async generateToken(payload: TokenPayload): Promise<string> {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60;

    return await new SignJWT(payload as unknown as JWTPayload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt(iat)
      .setExpirationTime(exp)
      .sign(this.secret);
  }

  async verifyToken(token: string): Promise<TokenPayload> {
    const { payload } = await jwtVerify(token, this.secret);
    return payload as unknown as TokenPayload;
  }

  async getUserIdFromToken(token: string): Promise<number> {
    const payload = await this.verifyToken(token);
    return payload.userId;
  }

  async isTokenExpired(token: string): Promise<boolean> {
    try {
      const { payload } = await jwtVerify(token, this.secret);
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp !== undefined && payload.exp < currentTime;
    } catch {
      return true;
    }
  }

  async isAdmin(token: string): Promise<boolean> {
    const { payload } = await jwtVerify(token, this.secret);
    return (payload.role === "admin");
  }
}

const jwtUtil = new JwtUtil();
export default jwtUtil;
