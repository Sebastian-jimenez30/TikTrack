import { NextRequest, NextResponse } from "next/server";
import { influencerComparisonController } from "@/interface-adapters/controllers/influencer.comparison.controller";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const usernames = searchParams.get("usernames")?.split(",") || [];
  const result = await influencerComparisonController.compare({
    searchParams: { usernames },
  });
  return NextResponse.json(result);
}
