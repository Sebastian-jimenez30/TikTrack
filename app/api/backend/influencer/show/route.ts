import { NextRequest, NextResponse } from "next/server";
import { influencerController } from "@/interface-adapters/controllers/influencer.controller";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const username = body?.username;

  const data = await influencerController.show({ params: { username } });

  return NextResponse.json(data);
}
