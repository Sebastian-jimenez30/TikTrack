import { NextRequest, NextResponse } from "next/server";
import { influencerController } from "@/interface-adapters/controllers/influencer.controller";
import { UserLikesInfluencerRepository } from "@/infrastructure/repositories/userLikesInfluencer.repository";
import jwtUtil from "@/shared/utils/jwt.util";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  // Obtener el token y el usuario autenticado
  const token = req.cookies.get("authToken")?.value;
  let userId = null;
  if (token) {
    try {
      const decoded = await jwtUtil.verifyToken(token);
      userId = decoded.userId;
    } catch {}
  }

  const data = await influencerController.show({ params: { username } });

  const userLikesInfluencer = new UserLikesInfluencerRepository();

  let favorites: any[] = [];
  if (userId) {
    favorites = await userLikesInfluencer.getFavoritesByUserId(userId);
  }

  (data.pageData as Record<string, any>).favorites = favorites;

return NextResponse.json(data);
}