import { NextRequest, NextResponse } from "next/server";
import { influencerController } from "@/interface-adapters/controllers/influencer.controller";

export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username") || null;
  const data = await influencerController.report({ params: { username } });

  return NextResponse.json(data);
}
