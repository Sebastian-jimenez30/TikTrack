import { NextRequest, NextResponse } from "next/server";
import { influencerController } from "@/interface-adapters/controllers/influencer.controller";

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { influencerUsername } = body;

  const data = await influencerController.refresh({
    params: { influencerUsername },
  });

  return NextResponse.json(data);
}
