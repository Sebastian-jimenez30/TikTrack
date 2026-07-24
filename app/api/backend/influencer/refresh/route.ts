import { NextRequest, NextResponse } from "next/server";
import { influencerController } from "@/interface-adapters/controllers/influencer.controller";

export async function PATCH(req: NextRequest) {
  if (process.env.SCRAPER_COMMANDS_ENABLED !== "true") {
    return NextResponse.json(
      { isSuccess: false, error: "Local scraper commands are disabled." },
      { status: 503 }
    );
  }

  const body = await req.json();
  const { influencerUsername } = body;

  const data = await influencerController.refresh({
    params: { influencerUsername },
  });

  return NextResponse.json(data);
}
