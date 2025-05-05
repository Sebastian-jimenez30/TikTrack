import { NextRequest, NextResponse } from "next/server";
import { influencerController } from "@/interface-adapters/controllers/influencer.controller";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const data = await influencerController.show({ params: { username } });

  return NextResponse.json(data);
}
