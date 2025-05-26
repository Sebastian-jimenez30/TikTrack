import { NextRequest, NextResponse } from "next/server";
import { userController } from "@/interface-adapters/controllers/user.controller";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || undefined;
  const role = searchParams.get("role") || undefined;
  const status = searchParams.get("status") || undefined;
  const updatedAt = searchParams.get("updatedAt") || undefined;
  const search = searchParams.get("search") || undefined;

  const data = await userController.index({
    searchParams: { page, role, status, updatedAt, search },
  });

  return NextResponse.json(data);
}
