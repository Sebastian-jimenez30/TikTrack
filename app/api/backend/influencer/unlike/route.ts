import { NextRequest, NextResponse } from "next/server";
import { UserLikesInfluencerRepository } from "@/infrastructure/repositories/userLikesInfluencer.repository";
import jwtUtil from "@/shared/utils/jwt.util";

export async function DELETE(req: NextRequest) {
  const { influencerId } = await req.json();
  const token = req.cookies.get("authToken")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let userId;
  try {
    const decoded = await jwtUtil.verifyToken(token);
    userId = decoded.userId;
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const repo = new UserLikesInfluencerRepository();
  await repo.removeLike(userId, influencerId);

  return NextResponse.json({ success: true });
}