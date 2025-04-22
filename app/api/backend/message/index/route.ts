import { NextRequest, NextResponse } from "next/server";
import { messageController } from "@/interface-adapters/controllers/message.controller";

export async function GET() {
  const data = await messageController.index();
  
  return NextResponse.json(data);
}