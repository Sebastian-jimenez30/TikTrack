import { NextRequest, NextResponse } from "next/server";
import { userController } from "@/interface-adapters/controllers/user.controller";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || undefined;
  const data = await userController.index({ searchParams: { page } });

  return NextResponse.json(data);
}
