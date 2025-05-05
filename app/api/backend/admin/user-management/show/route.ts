import { NextRequest, NextResponse } from "next/server";
import { userController } from "@/interface-adapters/controllers/user.controller";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const data = await userController.show({ params: { id } });

  return NextResponse.json(data);
}
