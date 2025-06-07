import { NextRequest, NextResponse } from "next/server";
import { influencerController } from "@/interface-adapters/controllers/influencer.controller";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const usernames = searchParams.get("usernames")?.split(",") || [];
  const result = await influencerController.compare({
    searchParams: { usernames },
  });
  return NextResponse.json(result);
}
