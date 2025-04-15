import { NextRequest, NextResponse } from "next/server";
import { influencerController } from "@/interface-adapters/controllers/influencer.controller";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || undefined;
  const data = await influencerController.index({ searchParams: { page } });

  return NextResponse.json(data);
}
