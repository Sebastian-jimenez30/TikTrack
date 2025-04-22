import { NextRequest, NextResponse } from "next/server";
import { messageController } from "@/interface-adapters/controllers/message.controller";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = await messageController.create({ params: body });
  revalidatePath("/messages");

  return NextResponse.json(data);
}