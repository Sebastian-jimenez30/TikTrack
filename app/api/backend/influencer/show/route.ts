import { NextRequest, NextResponse } from "next/server";
import { influencerController } from "@/interface-adapters/controllers/influencer.controller";
import jwtUtil from "@/shared/utils/jwt.util";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  if (!username) {
    return NextResponse.json({ status: 400 });
  }

  const token = req.cookies.get("authToken")?.value;
  let userId = null;
  if (token) {
    try {
      const decoded = await jwtUtil.verifyToken(token);
      userId = decoded.userId;
    } catch {}
  }

  const data = await influencerController.show({
    params: { username, userId },
  });

  return NextResponse.json(data);
}
