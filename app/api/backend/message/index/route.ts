import { NextRequest, NextResponse } from "next/server";
import { messageController } from "@/interface-adapters/controllers/message.controller";

export async function GET(req: NextRequest) {
  const user_id = Number(req.nextUrl.searchParams.get("user_id"));
  if (!user_id) {
    return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
  }
  const data = await messageController.index({ user_id });
  return NextResponse.json(data);
}
