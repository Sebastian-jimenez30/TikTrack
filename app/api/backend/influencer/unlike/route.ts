import { NextRequest, NextResponse } from "next/server";
import { influencerController } from "@/interface-adapters/controllers/influencer.controller";

export async function DELETE(req: NextRequest) {
  const { userId, influencerId } = await req.json();

  const data = await influencerController.unlike({
    request: { userId, influencerId },
  });
  return NextResponse.json(data);
}
