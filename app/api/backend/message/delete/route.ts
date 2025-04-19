import { NextRequest, NextResponse } from "next/server";
import { messageController } from "@/interface-adapters/controllers/message.controller";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  await messageController.delete({ params: { id: Number(id) } });

  return NextResponse.json({ success: true });
}
