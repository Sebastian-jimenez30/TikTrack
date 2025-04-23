import { NextRequest, NextResponse } from "next/server";
import { influencerController } from "@/interface-adapters/controllers/influencer.controller";

export async function GET(req: NextRequest) {
  const { search } = Object.fromEntries(req.nextUrl.searchParams);

  if (!search) {
    return NextResponse.json({ error: "Search query is required" }, { status: 400 });
  }

  const data = await influencerController.search({ searchParams: { query: search, page: "1" } });
  
  return NextResponse.json(data);
}