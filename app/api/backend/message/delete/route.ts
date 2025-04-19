import { NextRequest, NextResponse } from "next/server";
import { messageController } from "@/interface-adapters/controllers/message.controller";
import { revalidatePath } from "next/cache";

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { id } = body;
  await messageController.delete({ params: { id: Number(id) } });

  revalidatePath("/messages");
  return NextResponse.json({ success: true });
}