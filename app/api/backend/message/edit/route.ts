import { NextRequest, NextResponse } from "next/server";
import { messageController } from "@/interface-adapters/controllers/message.controller";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { content } = body;
  const id = Number(params.id);
  const data = await messageController.update({
    params: { id, content },
  });

  return NextResponse.json(data);
}
