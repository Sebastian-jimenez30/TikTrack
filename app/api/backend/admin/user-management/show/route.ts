import { NextRequest, NextResponse } from "next/server";
import { userController } from "@/interface-adapters/controllers/user.controller";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const id = body?.id;

  const data = await userController.show({ params: { id } });

  return NextResponse.json(data);
}
