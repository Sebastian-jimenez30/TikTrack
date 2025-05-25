import { NextRequest, NextResponse } from "next/server";
import { userLikesInfluencerController } from "@/interface-adapters/controllers/userLikesInfluencer.controller";
import jwtUtil from "@/shared/utils/jwt.util";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
  if (!token || (await jwtUtil.isTokenExpired(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = await jwtUtil.getUserId(token);
  if (!userId) {
    return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
  }

  const { influencerId } = await req.json();
  if (!influencerId) {
    return NextResponse.json(
      { error: "Missing influencerId" },
      { status: 400 }
    );
  }

  await userLikesInfluencerController.like({ userId, influencerId });
  return NextResponse.json({ success: true });
}
