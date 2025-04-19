import { NextRequest, NextResponse } from "next/server";
import { messageController } from "@/interface-adapters/controllers/message.controller";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = await messageController.create({ params: body });
  
  return NextResponse.json(data);
}