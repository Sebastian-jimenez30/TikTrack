import { NextRequest, NextResponse } from "next/server";
import { messageController } from "@/interface-adapters/controllers/message.controller";
import { revalidatePath } from "next/cache";

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, content } = body;
  const data = await messageController.update({
    params: { id: Number(id), content: content },
  });

  revalidatePath("/messages");
  return NextResponse.json(data);
}
