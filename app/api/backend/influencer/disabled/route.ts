import { NextRequest, NextResponse } from "next/server";
import { influencerController } from "@/interface-adapters/controllers/influencer.controller";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || undefined;
  const city = searchParams.get("city") || undefined;
  const followers = searchParams.get("followers") || undefined;
  const engagementVisualizationRate =
    searchParams.get("engagementVisualizationRate") || undefined;
  const updatedAt = searchParams.get("updatedAt") || undefined;
  const search = searchParams.get("search") || undefined;

  const data = await influencerController.disabled({
    searchParams: {
      page,
      city,
      followers,
      engagementVisualizationRate,
      updatedAt,
      search,
    },
  });

  return NextResponse.json(data);
}
